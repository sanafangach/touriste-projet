<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; padding: 20px; }
        .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 28px; font-weight: 800; color: #ff7a00; letter-spacing: 2px; }
        .btn { display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #ff7a00, #ff4d00); color: white; text-decoration: none; border-radius: 50px; font-weight: 600; margin: 20px 0; }
        .info { color: #666; font-size: 14px; line-height: 1.6; }
        .warning { color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">AMUDUX</div>
        </div>
        
        <h2 style="color: #1a1a1a; text-align: center;">Réinitialisation du mot de passe</h2>
        
        <p class="info">Bonjour,</p>
        <p class="info">Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous :</p>
        
        <div style="text-align: center;">
            <a href="http://localhost:3000/reset-password?token={{ $token }}&email={{ $email }}" class="btn">
                Réinitialiser mon mot de passe
            </a>
        </div>
        
        <p class="info" style="text-align: center;">Ce lien est valable pendant <strong>30 minutes</strong>.</p>
        
        <div class="warning">
            Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
        </div>
    </div>
</body>
</html>