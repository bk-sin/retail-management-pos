import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class ResendService {
  private readonly resend: Resend;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error(
        '⚠️  RESEND_API_KEY no está configurada. Los emails no se enviarán.',
      );
    }
    this.resend = new Resend(apiKey);
  }

  async sendEmail(to: string, subject: string, html: string) {
    try {
      const { data, error } = await this.resend.emails.send({
        from: 'Tu Nombre <hola@tudominioverificado.com>',
        to: [to],
        subject: subject,
        html: html,
      });

      if (error) {
        throw new Error(`Error al enviar el correo: ${error.message}`);
      }

      console.log('Correo enviado exitosamente:', data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async sendBetaWelcomeEmail(email: string) {
    try {
      const { data, error } = await this.resend.emails.send({
        from: 'Envy <onboarding@resend.dev>',
        to: [email],
        subject: '¡Bienvenido a la Beta de Envy! 🚀',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #6366f1; font-size: 28px; margin: 0;">Envy</h1>
              <p style="color: #64748b; font-size: 16px; margin: 10px 0;">La forma moderna de gestionar variables de entorno</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
              <h2 style="margin: 0 0 15px 0; font-size: 24px;">¡Bienvenido a la Beta! 🎉</h2>
              <p style="margin: 0; font-size: 18px; opacity: 0.9;">Has dado el primer paso para sincronizar a tu equipo</p>
            </div>
            
            <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
              <h3 style="color: #1e293b; margin: 0 0 15px 0;">¿Qué sigue ahora?</h3>
              <ul style="color: #475569; padding-left: 20px; line-height: 1.6;">
                <li>Te notificaremos cuando la beta esté lista</li>
                <li>Serás uno de los primeros en probar Envy</li>
                <li>Tendrás acceso gratuito durante todo el período de beta</li>
                <li>Tu feedback nos ayudará a construir el mejor producto</li>
              </ul>
            </div>
            
            <div style="text-align: center; color: #64748b; font-size: 14px;">
              <p>¿Tienes alguna pregunta? Simplemente responde a este email.</p>
              <p style="margin-top: 20px;">
                Saludos,<br>
                <strong>El equipo de Envy</strong>
              </p>
            </div>
          </div>
        `,
      });

      if (error) {
        throw new Error(`Failed to send email: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error sending beta welcome email:', error);
      throw error;
    }
  }

  async sendInternalNotification(email: string) {
    try {
      const { data, error } = await this.resend.emails.send({
        from: 'Envy <onboarding@resend.dev>',
        to: ['beckasin.mc@gmail.com'], // Cambia por tu email verificado en Resend
        subject: 'Nueva suscripción a la Beta - Envy',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1e293b;">Nueva suscripción a la Beta</h2>
            <p style="color: #475569; font-size: 16px;">
              Un nuevo usuario se ha unido a la lista de espera de Envy:
            </p>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #6366f1;">
              <strong style="color: #1e293b;">Email:</strong> ${email}<br>
              <strong style="color: #1e293b;">Fecha:</strong> ${new Date().toLocaleString('es-ES')}
            </div>
          </div>
        `,
      });

      if (error) {
        console.error('Error sending internal notification:', error);
      }

      return data;
    } catch (error) {
      console.error('Error sending internal notification:', error);
    }
  }
}
