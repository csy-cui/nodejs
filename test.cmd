echo 开始

(
   echo @echo off
    echo mkdir test
    echo cd test
    echo echo console.log("Hello from test.cmd"^) ^> test.js  
    echo node test.js
) > bat.cmd


echo 结束