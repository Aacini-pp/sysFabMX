import 'dotenv/config'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'


export const cargandoHTMLEmail = (infoCLiente) => {
  let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Restablecer la contraseña para Fundación Ana Bella México</title>
  </head>
  <body
    style="
      -webkit-text-size-adjust: none;
      box-sizing: border-box;
      color: #74787e;
      font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
      height: 100%;
      line-height: 1.4;
      margin: 0;
      width: 100% !important;
    "
    bgcolor="#F2F4F6"
  >
    <style type="text/css">
      body {
        width: 100% !important;
        height: 100%;
        margin: 0;
        line-height: 1.4;
        background-color: #f2f4f6;
        color: #74787e;
        -webkit-text-size-adjust: none;
      }
      @media only screen and (max-width: 600px) {
        .email-body_inner {
          width: 100% !important;
        }
        .email-footer {
          width: 100% !important;
        }
      }
      @media only screen and (max-width: 500px) {
        .button {
          width: 100% !important;
        }
      }
    </style>
    <span
      class="preheader"
      style="
        box-sizing: border-box;
        display: none !important;
        font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
        font-size: 1px;
        line-height: 1px;
        max-height: 0;
        max-width: 0;
        mso-hide: all;
        opacity: 0;
        overflow: hidden;
        visibility: hidden;
      "
      >Use este enlace para restablecer su contraseña. El enlace solo es válido
      por 24 horas.</span
    >
    <table
      class="email-wrapper"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="
        box-sizing: border-box;
        font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
        margin: 0;
        padding: 0;
        width: 100%;
      "
      bgcolor="#F2F4F6"
    >
      <tr>
        <td
          align="center"
          style="
            box-sizing: border-box;
            font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
            word-break: break-word;
          "
        >
          <table
            class="email-content"
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="
              box-sizing: border-box;
              font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
              margin: 0;
              padding: 0;
              width: 100%;
            "
          >
            <tr>
              <td
                class="email-masthead"
                style="
                  box-sizing: border-box;
                  font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
                  padding: 25px 0;
                  word-break: break-word;
                "
                align="center"
              >
                <a
                  href="<?php echo URL; ?>"
                  class="email-masthead_name"
                  style="
                    box-sizing: border-box;
                    color: #bbbfc3;
                    font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
                    font-size: 16px;
                    font-weight: bold;
                    text-decoration: none;
                    text-shadow: 0 1px 0 white;
                  "
                >
                  Fundación Ana Bella México
                </a>
              </td>
            </tr>

            <tr>
              <td
                class="email-body"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  -premailer-cellpadding: 0;
                  -premailer-cellspacing: 0;
                  border-bottom-color: #edeff2;
                  border-bottom-style: solid;
                  border-bottom-width: 1px;
                  border-top-color: #edeff2;
                  border-top-style: solid;
                  border-top-width: 1px;
                  box-sizing: border-box;
                  font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
                  margin: 0;
                  padding: 0;
                  width: 100%;
                  word-break: break-word;
                "
                bgcolor="#FFFFFF"
              >
                <table
                  class="email-body_inner"
                  align="center"
                  width="570"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    box-sizing: border-box;
                    font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
                    margin: 0 auto;
                    padding: 0;
                    width: 570px;
                  "
                  bgcolor="#FFFFFF"
                >
                  <tr>
                    <td
                      class="content-cell"
                      style="
                        box-sizing: border-box;
                        font-family: Arial, 'Helvetica Neue', Helvetica,
                          sans-serif;
                        padding: 35px;
                        word-break: break-word;
                      "
                    >
                      <h1
                        style="
                          box-sizing: border-box;
                          color: #2f3133;
                          font-family: Arial, 'Helvetica Neue', Helvetica,
                            sans-serif;
                          font-size: 19px;
                          font-weight: bold;
                          margin-top: 0;
                        "
                        align="left"
                      >
                        Hola {{name}},
                      </h1>
                      <p
                        style="
                          box-sizing: border-box;
                          color: #74787e;
                          font-family: Arial, 'Helvetica Neue', Helvetica,
                            sans-serif;
                          font-size: 16px;
                          line-height: 1.5em;
                          margin-top: 0;
                        "
                        align="left"
                      >
                        Recientemente solicitó restablecer su contraseña para su
                        cuenta en Fundación Ana Bella México. Use el botón de
                        abajo para reiniciarlo.
                        <strong
                          style=" font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;"
                        >
                          Este restablecimiento de contraseña solo es válido
                          durante las próximas 24 horas.</strong
                        >
                      </p>

                      <table
                        class="body-action"
                        align="center"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        style="
                          box-sizing: border-box;
                          font-family: Arial, 'Helvetica Neue', Helvetica,
                            sans-serif;
                          margin: 30px auto;
                          padding: 0;
                          text-align: center;
                          width: 100%;
                        "
                      >
                        <tr>
                          <td
                            align="center"
                            style="
                              box-sizing: border-box;
                              font-family: Arial, 'Helvetica Neue', Helvetica,
                                sans-serif;
                              word-break: break-word;
                            "
                          >
                            <table
                              width="100%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                              style="
                                box-sizing: border-box;
                                font-family: Arial, 'Helvetica Neue', Helvetica,
                                  sans-serif;
                              "
                            >
                              <tr>
                                <td
                                  align="center"
                                  style="
                                    box-sizing: border-box;
                                    font-family: Arial, 'Helvetica Neue',
                                      Helvetica, sans-serif;
                                    word-break: break-word;
                                  "
                                >
                                  <table
                                    border="0"
                                    cellspacing="0"
                                    cellpadding="0"
                                    style="
                                      box-sizing: border-box;
                                      font-family: Arial, 'Helvetica Neue',
                                        Helvetica, sans-serif;
                                    "
                                  >
                                    <tr>
                                      <td
                                        style="
                                          box-sizing: border-box;
                                          font-family: Arial, 'Helvetica Neue',
                                            Helvetica, sans-serif;
                                          word-break: break-word;
                                        "
                                      >
                                        <a
                                          href="{{action_url_1}}"
                                          class="button button--green"
                                          target="_blank"
                                          style="
                                            -webkit-text-size-adjust: none;
                                            background: #22bc66;
                                            border-color: #22bc66;
                                            border-radius: 3px;
                                            border-style: solid;
                                            border-width: 10px 18px;
                                            box-shadow: 0 2px 3px
                                              rgba(0, 0, 0, 0.16);
                                            box-sizing: border-box;
                                            color: #fff;
                                            display: inline-block;
                                            font-family: Arial, 'Helvetica Neue',
                                              Helvetica, sans-serif;
                                            text-decoration: none;
                                          "
                                          >Restablecer contraseña</a
                                        >
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      <p
                        style="
                          box-sizing: border-box;
                          color: #74787e;
                          font-family: Arial, 'Helvetica Neue', Helvetica,
                            sans-serif;
                          font-size: 16px;
                          line-height: 1.5em;
                          margin-top: 0;
                        "
                        align="left"
                      >
                        Por razones de seguridad, esta solicitud se recibió de
                        un dispositivo {{operating_system}} usando
                        {{browser_name}}{{ip_info}}. Si no solicitó restablecer la
                        contraseña, ignore este correo electrónico o póngase en
                        contacto con el servicio de asistencia si tiene alguna
                        pregunta.
                      </p>
                      <p
                        style="
                          box-sizing: border-box;
                          color: #74787e;
                          font-family: Arial, 'Helvetica Neue', Helvetica,
                            sans-serif;
                          font-size: 16px;
                          line-height: 1.5em;
                          margin-top: 0;
                        "
                        align="left"
                      >
                        Gracias, <br />Equipo de Fundación Ana Bella México
                      </p>

                      <table
                        class="body-sub"
                        style="
                          border-top-color: #edeff2;
                          border-top-style: solid;
                          border-top-width: 1px;
                          box-sizing: border-box;
                          font-family: Arial, 'Helvetica Neue', Helvetica,
                            sans-serif;
                          margin-top: 25px;
                          padding-top: 25px;
                        "
                      >
                        <tr>
                          <td
                            style="
                              box-sizing: border-box;
                              font-family: Arial, 'Helvetica Neue', Helvetica,
                                sans-serif;
                              word-break: break-word;
                            "
                          >
                            <p
                              class="sub"
                              style="
                                box-sizing: border-box;
                                color: #74787e;
                                font-family: Arial, 'Helvetica Neue', Helvetica,
                                  sans-serif;
                                font-size: 12px;
                                line-height: 1.5em;
                                margin-top: 0;
                              "
                              align="left"
                            >
                              Si tiene problemas con el botón de arriba, copie y
                              pegue la siguiente URL en su navegador web.
                            </p>
                            <p
                              class="sub"
                              style="
                                box-sizing: border-box;
                                color: #74787e;
                                font-family: Arial, 'Helvetica Neue', Helvetica,
                                  sans-serif;
                                font-size: 12px;
                                line-height: 1.5em;
                                margin-top: 0;
                              "
                              align="left"
                            >
                              {{action_url_2}}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td
                style="
                  box-sizing: border-box;
                  font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
                  word-break: break-word;
                "
              >
                <table
                  class="email-footer"
                  align="center"
                  width="570"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    box-sizing: border-box;
                    font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
                    margin: 0 auto;
                    padding: 0;
                    text-align: center;
                    width: 570px;
                  "
                >
                  <tr>
                    <td
                      class="content-cell"
                      align="center"
                      style="
                        box-sizing: border-box;
                        font-family: Arial, 'Helvetica Neue', Helvetica,
                          sans-serif;
                        padding: 35px;
                        word-break: break-word;
                      "
                    >
                      <p
                        class="sub align-center"
                        style="
                          box-sizing: border-box;
                          color: #aeaeae;
                          font-family: Arial, 'Helvetica Neue', Helvetica,
                            sans-serif;
                          font-size: 12px;
                          line-height: 1.5em;
                          margin-top: 0;
                        "
                        align="center"
                      >
                        © 2021 Fundación Ana Bella México . Fundacion sin animos de lucro
                      </p>
                      <p
                        class="sub align-center"
                        style="
                          box-sizing: border-box;
                          color: #aeaeae;
                          font-family: Arial, 'Helvetica Neue', Helvetica,
                            sans-serif;
                          font-size: 12px;
                          line-height: 1.5em;
                          margin-top: 0;
                        "
                        align="center"
                      >
                        <br />Privada del granizo #3 unidad Capiri, Emiliano Zapata , Morelos, México
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`
  html = html.replace("{{name}}", infoCLiente.nombre)
    .replace("{{operating_system}}", infoCLiente.os)
    .replace("{{browser_name}}", infoCLiente.browser)
    .replace("{{action_url_1}}", infoCLiente.url)
    .replace("{{action_url_2}}", infoCLiente.url)
    .replace("{{ip_info}}", (infoCLiente.ip === undefined) ? "" : " y con ip:" + infoCLiente.ip)

  return html
}


/**Identifica por expreciones regulares  que Sistema regular es  atraves de UserAgent */
export const getOS = (ua) => {
  /** '/windows nt 10/i'      =>  'Windows 10',
                          '/windows nt 6.3/i'     =>  'Windows 8.1',
                          '/windows nt 6.2/i'     =>  'Windows 8',
                          '/windows nt 6.1/i'     =>  'Windows 7',
                          '/windows nt 6.0/i'     =>  'Windows Vista',
                          '/windows nt 5.2/i'     =>  'Windows Server 2003/XP x64',
                          '/windows nt 5.1/i'     =>  'Windows XP',
                          '/windows xp/i'         =>  'Windows XP',
                          '/windows nt 5.0/i'     =>  'Windows 2000',
                          '/windows me/i'         =>  'Windows ME',
                          '/win98/i'              =>  'Windows 98',
                          '/win95/i'              =>  'Windows 95',
                          '/win16/i'              =>  'Windows 3.11',
                          '/macintosh|mac os x/i' =>  'Mac OS X',
                          '/mac_powerpc/i'        =>  'Mac OS 9',
                          '/linux/i'              =>  'Linux',
                          '/ubuntu/i'             =>  'Ubuntu',
                          '/iphone/i'             =>  'iPhone',
                          '/ipod/i'               =>  'iPod',
                          '/ipad/i'               =>  'iPad',
                          '/android/i'            =>  'Android',
                          '/blackberry/i'         =>  'BlackBerry',
                          '/webos/i'              =>  'Mobile' */


  let sysOp = "OS desconocido"
  if (/windows/i.test(ua))
    sysOp = 'windows';
  else if (/windows nt 6.4/i.test(ua))
    sysOp = 'Windows 10';
  else if (/windows nt 6.3/i.test(ua))
    sysOp = 'Windows 8.1';
  else if (/windows nt 6.2/i.test(ua))
    sysOp = 'Windows 8';
  else if (/windows nt 6.1/i.test(ua))
    sysOp = 'Windows 7';
  else if (/windows nt 6.0/i.test(ua))
    sysOp = 'Windows Vista';
  else if (/windows nt 5.1/i.test(ua))
    sysOp = 'Windows xp';
  else if (/macintosh|mac os x/i.test(ua))
    sysOp = 'Mac OS X';
  else if (/linux/i.test(ua))
    sysOp = 'linux';
  else if (/ubuntu/i.test(ua))
    sysOp = 'ubuntu';
  else if (/iphone/i.test(ua))
    sysOp = 'iphone';
  else if (/ipod/i.test(ua))
    sysOp = 'ipod';
  else if (/ipad/i.test(ua))
    sysOp = 'ipad';
  else if (/android/i.test(ua))
    sysOp = 'android';
  else if (/blackberry/i.test(ua))
    sysOp = 'blackberry';
  else if (/webos/i.test(ua))
    sysOp = 'Mobile';

  else
    sysOp = 'OS desconocido ';


  return sysOp;

}


/**Identifica por expreciones regulares  que Navegador es  atraves de UserAgent */
export const getBrowser = (ua) => {

  /**
   * '/msie/i'      => 'Internet Explorer',
                          '/firefox/i'   => 'Firefox',
                          '/safari/i'    => 'Safari',
                          '/chrome/i'    => 'Chrome',
                          '/edge/i'      => 'Edge',
                          '/opera/i'     => 'Opera',
                          '/netscape/i'  => 'Netscape',
                          '/maxthon/i'   => 'Maxthon',
                          '/konqueror/i' => 'Konqueror',
                          '/mobile/i'    => 'Handheld Browser'
   * 
   */

  let browser = "Navegador desconocido"
  if (/firefox/i.test(ua))
    browser = 'Firefox';
  else if (/chrome/i.test(ua))
    browser = 'Chrome';
  else if (/safari/i.test(ua))
    browser = 'Safari';
  else if (/edge/i.test(ua))
    browser = 'Edge';
  else if (/opera/i.test(ua))
    browser = 'Opera';
  else if (/netscape/i.test(ua))
    browser = 'Netscape';
  else if (/maxthon/i.test(ua))
    browser = 'Maxthon';
  else if (/konqueror/i.test(ua))
    browser = 'konqueror';
  else if (/mobile/i.test(ua))
    browser = 'Handheld Browser';
  else if (/konqueror/i.test(ua))
    browser = 'konqueror';
  else if (/msie/i.test(ua))
    browser = 'Internet explorer';
  else
    browser = 'Navegador desconocido ';



  return browser
}

const parseIp = (req) => {
  req.headers['x-forwarded-for']?.split(',').shift()
    || req.socket?.remoteAddress
}



export const generarInfoCliente = (req) => {

  let ua = req.headers['user-agent']
  let os = getOS(ua);
  let browser = getBrowser(ua)
  let ip = parseIp(req)

  return { os: os, browser: browser, ip: ip }

}


export const generarToken = (length) => {
  let fecha = new Date().toISOString()
  length = length - fecha.length
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }


  return fecha + result;
}

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.userGmail,  //TODO:enviar a env
    pass: process.env.passGmail,
  },
});



transporter.verify().then(() => {
  console.log("Listo para el envio de emails")

})





