#!/bin/sh
set -e

apk add --no-cache postgresql16-client tzdata supercronic coreutils findutils

# Mapear variables de entorno al formato esperado por PostgreSQL
export POSTGRES_HOST="${POSTGRES_HOST:-db}"
export POSTGRES_PORT="${POSTGRES_PORT:-5432}"
export POSTGRES_USER="${POSTGRES_USER:-${DB_USER}}"
export POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-${DB_PASSWORD}}"
export POSTGRES_DB="${POSTGRES_DB:-${DB_NAME}}"

# Zona horaria
[ -n "$TZ" ] && cp "/usr/share/zoneinfo/$TZ" /etc/localtime || true

# Esperar a que la DB esté lista
i=0
until PGPASSWORD="$POSTGRES_PASSWORD" psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "select 1" >/dev/null 2>&1; do
  i=$((i+1)); [ $i -gt 30 ] && echo "DB not ready" && exit 1
  echo "⏳ Esperando DB..."; sleep 2
done

# Script principal de backup
cat > /bin/do_dump << 'EOF'
#!/bin/sh
set -eu
TYPE="${1:?use daily|weekly|monthly}"
TS="$(date +%Y%m%d-%H%M%S)"
DIR="/backups/$TYPE"
mkdir -p "$DIR"
FILE="${DIR}/${POSTGRES_DB}_${TS}.dump"

case "$TYPE" in
  daily)   KEEP="${RETENTION_DAILY:-7}"   ;;
  weekly)  KEEP="${RETENTION_WEEKLY:-5}"  ;;
  monthly) KEEP="${RETENTION_MONTHLY:-12}";;
  *) echo "tipo desconocido: $TYPE" >&2; exit 1 ;;
esac

PGPASSWORD="$POSTGRES_PASSWORD" pg_dump \
  -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" \
  -U "$POSTGRES_USER" -d "$POSTGRES_DB" \
  -F c -f "$FILE"

echo "[$(date)] ✅ ${TYPE} backup -> $FILE"

# Retención (mantener los N más nuevos)
ls -1t "$DIR"/* 2>/dev/null | tail -n +$((KEEP+1)) | xargs -r rm -f || true
EOF
chmod +x /bin/do_dump

# Definir cron jobs
echo "${CRON_DAILY:-5 3 * * *} /bin/do_dump daily"   >  /crontab
echo "${CRON_WEEKLY:-10 3 * * 0} /bin/do_dump weekly" >> /crontab
echo "${CRON_MONTHLY:-15 3 1 * *} /bin/do_dump monthly" >> /crontab

# Backup inicial
/bin/do_dump daily || true

exec supercronic -passthrough-logs /crontab
