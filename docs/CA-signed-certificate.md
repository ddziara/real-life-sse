https://www.ibm.com/docs/en/license-metric-tool?topic=certificate-step-1-creating-private-keys-certificates

# Configuring secure communication with a CA-signed certificate

## Step 1: Creating private keys and certificates

To improve security, create your own private key and a certificate<br>
instead of using the self-signed ones that are available in License<br>
Metric Tool by default. You can use OpenSSL to create a private key<br>
and a certificate signing request (CSR) that can be transformed into<br>
a certificate after it is signed by a certificate authority (CA).

### About this task

This procedure is valid for all operating systems that are supported<br>
by OpenSSL.

### Procedure

1. Open the command line.

2. Create a new private key in the PKCS#1 format.

        openssl genrsa -des3 -out key_name.key key_strength

    For example:

        openssl genrsa -des3 -out private_key.key 2048

    Where:        

    **-des3**

    Enables password for the private key. This is an optional<br>
    parameter. You can also enable password for an existing<br>
    private key by using the following command:    

        openssl rsa -des3 -in path_to_private_key.key -out key_name.key

    **key_name**

    File name for your new private key.     

    **key_strength**   

    Key strength, measured in bits. The maximum value that you can use for License Metric Tool is:

    * For application update 9.2.10 and higher: 16384 bits
    * For application update 9.2.9 and lower: 2048 bits.

3. Create a certificate signing request (CSR). The request is<br>
   associated with your private key and is later transformed into<br>
   a certificate.    

       openssl req -new -key path_to_private_key.key -out csr_name.csr

    For example: 

        openssl req -new -key private_key.key -out CSR.csr      

    Where:

    **path_to_private_key**

    Path to your private key.

    **csr_name**

    File name for your certificate signing request (CSR).


    After you run the command, you are asked to provide information<br>
    that helps your users to identify your certificate and ensure that<br>
    it can be trusted. The following excerpt from the command line is<br>
    filled in with sample information:

        Country Name (2 letter code) [XX]: US

        State or Province Name (full name) []: New York

        Locality Name (eg, city) [Default City]: New York

        Organization Name (eg, company) [Default Company Ltd]: IBM

        Organizational Unit Name (eg, section) []: Software

        Common Name (eg, your name or your server's hostname) []: inventory.ibm.com

        Email Address []: inventory@ibm.com

## Step 2: Signing certificates        

After you create a certificate signing request (CSR), it must be<br>
signed by a certificate authority (CA) to be transformed into<br>
a certificate that can be uploaded to License Metric Tool. You can use<br>
the OpenSSL cryptographic library to create a private CA and sign your<br>
request.

### Before you begin

Using a private CA to sign your request is not the only way. You can<br>
also send the request to internationally trusted CAs, such as Entrust,<br>
VeriSign, and so on, or use the CA of your organization.<br>
The certificates of these CAs are often trusted by default and do not<br>
display any warnings in the browser. Warnings might be displayed if<br>
you use a private CA.

## Procedure

1. Create a private certificate authority (CA) and a certificate for<br>
   it.

   a. Create a private CA. This step creates a private key (.key) and<br>
      a request (.csr) similar to those that you created in Creating<br>
      private keys and certificates.

        openssl req -new -newkey rsa:key_strength -nodes 
        -out CA_csr_name.csr -keyout CA_key_name.key -sha256

      For example:

        openssl req -new -newkey rsa:2048 -nodes -out CA_CSR.csr -keyout CA_private_key.key -sha256

      Where:

      **key_strength**

      Key strength, measured in bits. The maximum value that you can<br>
      use for License Metric Tool is:

      * For application update 9.2.10 and higher: 16384 bits
      * For application update 9.2.9 and lower: 2048 bits. 
      
      **CA_csr_name**

      File name for the certificate signing request (CSR).<br> 
      The certificate authority (CA) requires a separate request.

      **CA_key_name**

      File name for the private key. The certificate authority (CA)<br>
      requires a separate private key.

      b. Create a certificate for your private CA. This step creates<br>
         a certificate (.arm) that you can use to sign your CSR.

        openssl x509 -signkey path_to_CA_key.key -days 
        number_of_days -req -in path_to_CA_csr.csr 
        -out CA_certificate_name.arm -sha256

      Where:

      **key_strength**

      Key strength, measured in bits. The maximum value that you can<br>
      use for License Metric Tool is:

      * For application update 9.2.10 and higher: 16384 bits
      * For application update 9.2.9 and lower: 2048 bits.

      **path_to_CA_csr**

      File name for the certificate signing request (CSR) that you<br>
      created for the certificate authority (CA).

      **path_to_CA_key**

      File name for the private key that you created for<br>
      the certificate authority (CA).

      **number_of_days**

      Number of days for the new certificate to be valid.

      **CA_certificate_name**

      File name for the certificate of your CA. This certificate is<br>
      used to sign your CSR.

2. Use the CA certificate to sign the certificate signing request that<br>
   you created in Creating private keys and certificates.

        openssl x509 -req -days number_of_days -in path_to_csr.csr -CA path_to_CA_certificate.arm 
        -CAkey path_to_CA_key.key -out new_certificate.arm -set_serial 01 -sha256

   Where:

   **number_of_days**     

   Number of days for the new certificate to be valid.

   **path_to_csr**

   Path to certificate signing request (CSR) that you want to sign.

   **path_to_CA_certificate**

   Path to certificate that you created for the certificate authority<br>
   (CA).

   **path_to_CA_key**

   Path to the private key that you created for the certificate<br>
   authority (CA).

   **new_certificate**

   File name for the new certificate that is created from your<br>
   certificate signing request (CSR). You upload this certificate<br>
   together with your private key to License Metric Tool.

   