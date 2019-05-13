   <?php
            if(isset($_POST['submitted']))
{
            include('mysql_connect.php');
                
                $name = $_POST['name'];
                $email = $_POST['email'];
                $phone = $_POST['phone'];
                $comment = $_POST['comment'];
                
                $sqlinsert="INSERT INTO people (Name,Email,Phone,Comments) values('$name','$email','$phone','$comment')";
                    
                    if(!mysqli_query($dbcon, $sqlinsert))
                    {
                        die('Error inserting new record');
                    }
               header("refresh:2; url=index.html");
                    
                    
}
        ?>
        
        
        