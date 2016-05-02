<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<c:import url="/static/common/head/favicon.jsp" />
		<c:import url="/static/common/head/metaTags.jsp" />
		<c:import url="/static/common/head/jquery.jsp" />
		<c:import url="/static/common/head/bootstrap.jsp" />
		<c:import url="/static/common/head/style.jsp" />
		<link rel="stylesheet" type="text/css" href="<c:url value='/static/css/pages/login.css'/>"/>
		<title>EnviroSense</title>
	</head>

	<body>
		<div id="wrapper">
        <div class="container-fluid">
			
			<div class="row">
				<div class="col-xs-12 col-sm-8 col-sm-offset-2 page-header">
					<div class="jumbotron text-center">
						<img src="<c:url value='/static/images/Elements/Logo/Logo - Small.png' />" class="img-responsive center-block" />
						<h1>
							<strong>EnviroSense</strong>
						</h1>
					</div>
				</div>
			</div>
			
			<div class="row">
				<div class="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4">
					<!-- Login Form -->
					<form id="loginForm" action="<c:url value='/login' />" method="POST">
						<fieldset class="input-group-vertical">
							<div class="form-group">
								<input type="hidden" name="<c:out value='${_csrf.parameterName}' />" value="${_csrf.token}" />
								<input type="email" class="form-control" name="email" placeholder="Email" required autofocus />
							</div>

							<div class="input-group form-group">
								<input type="password" id="password" class="form-control" name="password" placeholder="Password" autocomplete="off" required />
								<span class="input-group-btn">
									<button class="btn btn-default" type="submit" form="loginForm">
									<i class="glyphicon glyphicon-menu-right"></i>
									</button>
								</span>
							</div>
						</fieldset>
					</form>
					
					<!-- Parameter : SUCCESS -->
					<c:if test="${param.logout != null}">
						<div class="alert alert-success">
						<p>You have been logged out successfully.</p>
						</div>
					</c:if>

					<!-- Parameter : ERROR -->
					<c:if test="${param.error != null}">
						<div class="alert alert-danger">
						<p>Invalid username and password.</p>
						</div>
					</c:if>

					<!-- Parameter : WARNING -->
					<c:if test="${param.warning != null}">
						<div class="alert alert-warning">
						<p>The email you provided is not found. Please try
						again or contact the administrator for assistance.</p>
						</div>
					</c:if>
					<hr />
				</div>
			</div>
		</div>
		</div>
	</body>
</html>