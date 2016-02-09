<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>Login page</title>
        
        <!-- Bootstrap core CSS -->
        <link href="../css/bootstrap.min.css" rel="stylesheet">
        
        
    </head>

    <body>

        <!--  Error check -->
        <c:if test="${param.error != null}">
            <div class="alert alert-danger">
                <p>Invalid username and password.</p>
            </div>
        </c:if>

        <!--  Logout check -->
        <c:if test="${param.logout != null}">
            <div class="alert alert-success">
                <p>You have been logged out successfully.</p>
            </div>
        </c:if>
        
        <c:url var="loginUrl" value="/login" />
        <form action="${loginUrl}" method="POST">


            <div>
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Email" required>
            </div>
            <div>
                <label for="password">Password</label> 
                <input type="password" id="password" name="password" placeholder="Password" required>
            </div>

            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
            <div>
                <input type="submit" value="Log in">
            </div>
        </form>
    </body>
</html>