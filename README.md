# Ad hoc testing tools

Use your browser, dev tools, and browser extensions to accomplish the following:

- Detect broken links (manually or using an extension) [Chrome extension](https://chrome.google.com/webstore/detail/check-my-links/ojkcdipcgfaekbeaelaapakgnjflfglf)<sup>[1](#myfootnote1)</sup> [Firefox extension](https://addons.mozilla.org/en-CA/firefox/addon/simple-link-checker/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search)<sup>[1](#myfootnote1)</sup>.
- Fix any accessibility errors identified by aXe [Chrome extension](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd) [Firefox extension](https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search).
- Score 100 on Lighthouse metrics for performance, best practices and SEO. Comes pre-installed with Chrome dev tools<sup>[1](#myfootnote1)</sup><sup>[2](#myfootnote1)</sup>. 
- Validate your HTML document according to [W3C specifications](https://validator.nu/)
- Fix any errors logged with `console.assert()`.
- Make sure that submitting the form without required fields alerts the user.
- ~~Fix responsive layout (Use the responsive view in your browser dev tools).~~

<hr>

<a name="myfootnote1">1</a>: A few of these tools can only analyze pages that are being *served*. They'll work on any pages on the internet, but if you want to test html files that are just sitting on your computer, you'll need to serve them with a local server. See the [notes](#local-servers) below on how to accomplish this.

<a name="myfootnote2">2</a>: You can run Lighthouse audits on live web pages via [Firefox extension](https://addons.mozilla.org/en-US/firefox/addon/google-lighthouse/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search) or [web.dev](https://web.dev/measure/), but neither seems to support static pages or pages served via local server.

<hr>


## Local servers
To start a local server, you must have PHP (v5.4+) or Python installed on your system. 

To verify that these are installed, open your command prompt (Windows) or terminal (Mac) and verify the version:

PHP 
```php
php -v
```
Python 
```python
python -V
```

Both of these languages come installed on Macs. Windows users can install PHP by [downloading PHP](https://www.php.net/downloads.php), and Python by [downloading Python](https://www.python.org/downloads/windows/). Since we're in the second semester, though, hopefully one or both of these are already installed on your machine.

In your terminal, change directories into the `public` folder of this project.

Windows 
```powershell
Set-Location -Path /path/to/public
```
Mac 
```bash
cd /path/to/public
```

Start the web server with the following command:

PHP 
```php
php -S localhost:8000
```
Python (v2) 
```python
python -m SimpleHTTPServer
```
Python (v3) 
```python3
python3 -m http.server
```

After running any of the above commands, you can go to [http://localhost:8000](http://localhost:8000) in a browser and see the `index.html` file served from the public server.
