package com.reware.rejobs.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class CorreoService {
    
    @Autowired
    private JavaMailSender mailSender;

    public void enviar(String destinatario, String asunto, String cuerpo) {
        try {
            MimeMessage mensaje = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensaje, true, "UTF-8");

            helper.setTo(destinatario);
            helper.setSubject(asunto);
            helper.setText(cuerpo, true); 

            mailSender.send(mensaje);
            System.out.println("Correo enviado correctamente a " + destinatario);
        } catch (MessagingException e) {
            System.out.println("Error al enviar correo: " + e.getMessage());
        }
    }

    public void enviarNotificacion(String destinatario, int id, String titulo, String empresa, String categoria) {
        String asunto = "NUEVA VACANTE DE TRABAJO " + titulo.toUpperCase();
        
        String cuerpo = """
                <html>
                <head>
                    <style>
                        .header {
                            background-color:rgb(83, 121, 179);
                            color: white;
                            text-align: center;
                            padding: 10px 0;
                            font-size: 24px;
                            font-weight: bold;
                        }
                        .content {
                            background-color:rgb(176, 193, 209);
                            padding: 20px;
                            font-family: Arial, sans-serif;
                            font-size: 18px;
                            text-align: center;
                            color: black;
                        }
                        .highlight {
                            color:rgb(74, 75, 141);
                            font-weight: bold;
                        }
                        .service {
                            color:rgb(112, 112, 112);
                        }
                        .description {
                            color:rgb(74, 75, 141);
                            font-style: italic;
                        }
                    </style>
                </head>
                <body>
                    <div class='header'>Nueva vacante de Trabajo encontrada</div>
                    <div class='content'>
                        <p>Se ha encontrado una vacante de """ + categoria + """
                        </p>
                        <p> <span class='service'>""" + titulo + """
                        </span> </p>
                        <p class='description'>De """ + empresa + """
                        </p>
                        <a href=' http://localhost:5173/vacancy/""" + id+"""
                        '>Saber más</a>
                    </div>
                </body>
                </html>""";

        enviar(destinatario, asunto, cuerpo);
    }
}
