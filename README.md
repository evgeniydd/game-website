<h1>Hello</h1>
<code>
  Как вариант можно было использовать PHP:

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $phone = $_POST["phone"];

    $webhook_url = "https://webhook.site/d37e7e69-122b-4f04-bf06-698631990111";

    $data = array(
        "name" => $name,
        "phone" => $phone
        
    );

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data),
        ),
    );

    $context  = stream_context_create($options);
    $result = file_get_contents($webhook_url, false, $context);

		if ($result !== FALSE) {
			header("Location: success_page.html");
    exit();
	} 
    
}
?>

</code>
