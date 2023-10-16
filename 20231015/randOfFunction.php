<h1>hello world, random!!</h1>
<?php
echo $myInt = rand(0, 100); //內建 Fn random ，指定(含) min 與 max，提供隨機數
echo ('<br>');

echo $myInt = rand(0, 10000000) / 10000000;
echo '<hr>';


function lokiEcho($str)
{
  echo $str.'<br>';
}

lokiEcho('hello world');

echo '<hr>';

function add5($num)
{
  return $num + 5;
}

echo add5(30);
echo '<br>';
lokiEcho(add5(40));
lokiEcho(add5(50));
lokiEcho(add5(60));

?>