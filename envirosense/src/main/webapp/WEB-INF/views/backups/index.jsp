<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Envirosense</title>
	</head>

	<body>
		<h1>Envirosense Welcome Page</h1>
                
                <c:url var="logoutURL" value="/logout" />
                <form action="${logoutURL}" method="POST">
                    <input type='submit' value="POST Logout">
                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
                </form>

	</body>
</html>