https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-apache-in-ubuntu-16-04

# How To Create a Self-Signed SSL Certificate for Apache in Ubuntu 16.04

    sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key -out /etc/ssl/certs/apache-selfsigned.crt

After you enter the command, you will be taken to a prompt where you<br>
can enter information about your website. Before we go over that,<br>
let’s take a look at what is happening in the command we are issuing:    

* **openssl**: This is the basic command line tool for creating and<br>
  managing OpenSSL certificates, keys, and other files.

* **req**: This subcommand specifies that we want to use X.509 certificate<br>
  signing request (CSR) management. The “X.509” is a public key<br>
  infrastructure standard that SSL and TLS adheres to for its key and<br>
  certificate management. We want to create a new X.509 cert, so we<br>
  are using this subcommand.  

* **-x509**: This further modifies the previous subcommand by telling 
  the utility that we want to make a self-signed certificate instead<vr>
  of generating a certificate signing request, as would normally<br>
  happen.  

* **-nodes**: This tells OpenSSL to skip the option to secure our<br>
  certificate with a passphrase. We need Apache to be able to read<br>
  the file, without user intervention, when the server starts up.<br>
  A passphrase would prevent this from happening because we would have<br>
  to enter it after every restart.  

* **-days 365**: This option sets the length of time that<br>
  the certificate will be considered valid. We set it for one year<br>
  here.

* **-newkey rsa:2048**: This specifies that we want to generate a new<br>
  certificate and a new key at the same time. We did not create<br>
  the key that is required to sign the certificate in a previous step,<br>
  so we need to create it along with the certificate. The rsa:2048<br>
  portion tells it to make an RSA key that is 2048 bits long.  

* **-keyout**: This line tells OpenSSL where to place the generated<br>
  private key file that we are creating.  

* **-out**: This tells OpenSSL where to place the certificate that we<br>
  are creating.  

  