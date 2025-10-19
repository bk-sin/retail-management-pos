#!/bin/sh
DB_HOST="db"
DB_PORT="5432"
MAX_RETRIES=30
RETRY_INTERVAL=1

echo "waiting db ($DB_HOST:$DB_PORT)..."

if ! command -v nc >/dev/null 2>&1; then
    echo "installing netcat..."
    apk add --no-cache netcat-openbs
fi

count=0
until nc -z $DB_HOST $DB_PORT; do
    count=$((count + 1))
    if [ $count -gt $MAX_RETRIES ]; then
        echo "Timeout waiting for database"
        exit 1
    fi
    echo "Attempt $count/$MAX_RETRIES: Database is unavailable - sleeping"
    sleep $RETRY_INTERVAL
done

echo "Database is up - executing command"
exec "$@"