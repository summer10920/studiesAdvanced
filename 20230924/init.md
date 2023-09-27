# 資源下載
- [Download Visual Studio Code](https://code.visualstudio.com/download)
- [xampp-portable-windows-x64-8.1.17-0-VS16.zip](https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.1.17/xampp-portable-windows-x64-8.1.17-0-VS16.zip/download)
- [Microsoft Visual C++ Redistributable latest supported downloads](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170)


# XAMPP 設定
## 指定站台位置
- 修改 `\xampp\apache\conf\httpd.conf`

```shell
# DocumentRoot "/xampp/htdocs"
# <Directory "/xampp/htdocs">
DocumentRoot "L:/studiesAdvanced"
<Directory "L:/studiesAdvanced">
```
