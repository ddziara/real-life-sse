https://www.pico.net/kb/how-do-you-get-chrome-to-accept-a-self-signed-certificate/

# How do you get Chrome to accept a self-signed certificate

1. Navigate to the site with the cert you want to trust, and click<br>
   through the usual warnings for untrusted certificates.

2. In the address bar, right click on the red warning triangle and<br>
   "Not secure" message and, from the resulting menu, select<br>
   "Certificate" to show the certificate.

3. In the window that pops up, select the "Details" tab (immediately<br>
   to the right of "General"), and click on the "Copy to File..." at<br>
   the bottom right of the tab.   

4. This launches the Certificate Export Wizard; click "Next" at<br>
   the bottom, which takes you to a radio-button dialogue for<br>
   selecting the format. Leave the default "DER encoded binary X.509<br>
   (.CER)" and click next again. 

5. Use the "Browse..." button to select a filename Documents (or<br>
   wherever you'd like to leave the exported cert), and remember<br>
   the name and path. Click "Next" to export the cert and then<br>
   "Finish".     

6. You should get another pop-up window telling you the export was<br>
   successful. Click "OK" to dismiss it, and again in the original<br>
   "Certificate" pop-up window to dismiss it too.   

7. Next open the Chrome settings page, scroll to the bottom, and<br>
   expand the "Advanced" section; in the "Privacy and security" panel,<br>
   click on the "Manage certificates" area.   

8. In the pop-up "Certificates" window, select the "Trusted Root<br>
   Certification Authorities" tab, and click on the "Import..."<br>
   button; this will launch the Certificate Import Wizard.   

9. Click "Next" and, on the next page, select "Browse..." and use<br>
   the explorer window to locate the certificate you exported at<br>
   step 5 above.   

10. Click "Next" again, then "Finish", and, in the "Security Warning"<br>
    pop-up, click on "Yes"; you should see yet another pop-up letting<br>
    you know that the import was successful.   

11. Restart Chrome, and navigate to the webpage again; this time you<br>
    should see the closed padlock and "Secure" annotation to the left<br>
    of the URL.    