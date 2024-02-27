https://dev.to/devland/how-to-generate-and-use-an-ssl-certificate-in-nodejs-2996

# How to Generate and Use an SSL Certificate in Node.js

## Generate a Private Key

To generate a private key we need to install OpenSSL, a full-featured<br>
toolkit for the Transport Layer Security (TLS) and Secure Sockets<br>
Layer (SSL) protocols, on our local machine. These articles can help<br>
you install it. Windows - Ubuntu.

After the installation, we need to run this command as shown below to<br>
generate the private key:

    openssl genrsa -out key.pem

Once we ran the above command it will generate the private key and<br>
save it in key.pem file inside cert directory and gives this type of<br>
message in the terminal.  

Generating RSA private key, 2048 bit long modulus
...+++
.................+++
e is 65537 (0x10001)

## Create a CSR (Certificate Signing Request)

Since we are our own certificate authority, we need to use CSR to<br>
generate our certificate. To do so we need to run the below command.

    openssl req -new -key key.pem -out csr.pem

Once we ran this command it will ask a few questions as shown below:

You can skip any question by simply pressing enter else if you want to<br>
provide the details you can provide them, it’s totally up to you.

Once you are done with these questions it will generate the CSR in<br>
csr.pem file inside cert folder.

## Generate the SSL Certificate

Now for the final steps, we need to use the key.pem and csr.pem files<br>
to generate our SSL certificate.

let’s run the below command to generate it.

    openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem

Note: We are using x509 because it is the standard defining the format<br>
of the public-key certificate. We set the validity of the certificate<br>
as 365 days.

After running the above command it will save the certificate in<br>
the cert.pem file inside cert folder. Now you can remove the csr.pem<br>
file or you can keep it.

