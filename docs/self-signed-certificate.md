https://gist.github.com/taoyuan/39d9bc24bafc8cc45663683eae36eb1a

# Generation of a Self Signed Certificate

Generation of a self-signed SSL certificate involves a simple 3-step<br>
procedure:

**STEP 1**: Create the server private key

>openssl genrsa -out cert.key 2048

**STEP 2**: Create the certificate signing request (CSR)

>openssl req -new -key cert.key -out cert.csr

**STEP 3**: Sign the certificate using the private key and CSR

>openssl x509 -req -days 3650 -in cert.csr -signkey cert.key -out cert.crt

Congratulations! You now have a self-signed SSL certificate valid for<br>
10 years.

