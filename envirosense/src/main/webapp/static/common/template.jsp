<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<c:import url="/common/head/favicon.jsp" />
		<c:import url="/common/head/metaTags.jsp" />
		<c:import url="/common/head/bootstrap.jsp" />
		<c:import url="/common/head/jquery.jsp" />
		<c:import url="/common/head/slick.jsp" />
		<c:import url="/common/head/customStyle.jsp" />
		<c:import url="/common/head/navbar.jsp" />

		<title>EnviroSense</title>
	</head>

	<body>
    <div id="wrapper">
		
		<!-- SIDEBAR CONTENT -->
		<c:import url="/common/navbar/content.jsp" />
		
		<div id="page-content-wrapper">
        <div class="row">
		<div class="col-xs-12 col-md-6 col-md-offset-3">
			
			<!-- SIDEBAR TOGGLE -->
			<c:import url="/common/navbar/toggle.jsp" />
			
			<!-- HEADER -->
			<c:import url="/common/header.jsp" />

				<div class="row">
				<div class="col-xs-12">
					<!-- Login Form -->
					<div class="row">
					<div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3">
						<form action="<c:url value='/login' />" method="POST">
							<fieldset class="input-group-vertical" id="loginForm">

							<div class="form-group">
								<input type="text" class="form-control" placeholder="Username">
							</div>

							<div class="input-group form-group">
								<input type="password" class="form-control" placeholder="Password">
								<span class="input-group-btn">
									<button class="btn btn-default" type="submit">
									<i class="glyphicon glyphicon-menu-right"></i>
									</button>
								</span>
							</div>

							</fieldset>

							<!-- Parameter : ERROR -->
							<c:if test="${param.error != null}">
								<div class="alert alert-danger">
								<p>Invalid username and password.</p>
								</div>
							</c:if>
							
							<!-- Parameter : SUCCESS -->
							<c:if test="${param.logout != null}">
								<div class="alert alert-success">
								<p>You have been logged out successfully.</p>
								</div>
							</c:if>
							
							<!-- Parameter : WARNING -->
							<c:if test="${param.warning != null}">
								<div class="alert alert-warning">
								<p>The email you provided is not found. Please try
								again or contact the administrator for assistance.</p>
								</div>
							</c:if>
						</form>
					</div>
					</div>

					<hr />

				</div>
				</div>

				<div class="row">
				<div class="col-xs-12">
					<small><a href="#forgotPassword" data-toggle="collapse" >Forgot Password</a></small>
					<div id="forgotPassword" class="collapse">

						<br />

						<!-- Forgot Password -->
						<form action="<c:url value='/resetPassword' />" method="POST">
						<fieldset class="input-group-vertical">

							<div class="input-group form-group">
								<input type="email" class="form-control" name="email" placeholder="Email" autocomplete="on" />
								<span class="input-group-btn">
									<button class="btn btn-default" type="submit">
									<i class="glyphicon glyphicon-menu-right"></i>
									</button>
								</span>
							</div>

						</fieldset>
						</form>

						<p class="well well-sm">
							We will send you instructions on how to 
							reset your password.
						</p>

					</div>
				</div>
				</div>

				<div class="row">
				<div class="col-xs-12">
					<hr />

					<div class="container-fluid">
					<h1>Slick Slider</h1>

					<div class="single-items">
						<div class="row">
						<div class="col-xs-12">
						<div class="panel panel-default">
							<div class="panel-heading">
									<img src="<c:url value='https://goo.gl/DEhnOo' />" />
								</div>
							<div class="panel-body">
								<img src="<c:url value='https://goo.gl/DEhnOo' />" />
								<img src="<c:url value='https://goo.gl/DEhnOo' />" />
							</div>
						</div>
						</div>
						</div>

						<div class="row">
						<div class="col-xs-12">
						<div class="panel panel-default">
							<div class="panel-body">
							<p class="well well-sm">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum iaculis
								est dui, sit amet lobortis nunc commodo nec.
							</p>

							<hr />

							<!-- Login Form -->
							<div class="row">
							<div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3">
								<form action="<c:url value='/login' />" method="POST">
									<fieldset class="input-group-vertical" id="loginForm">

									<div class="input-group form-group">
										<input type="text" class="form-control" placeholder="Say something...">
										<span class="input-group-btn">
											<button class="btn btn-default" type="submit">
											<i class="glyphicon glyphicon-menu-right"></i>
											</button>
										</span>
									</div>

									</fieldset>
								</form>
							</div>
							</div>
						</div>
						</div>
						</div>
						</div>

						<div class="row">
						<div class="col-xs-12">
						<div class="panel panel-default">
							<div class="panel-body">
							<p class="well well-sm">
								Unfortunately, Slick Carousel's text is not
								highlight-able. It can however, do clicks and
								text editing on textboxes.
							</p>
							<hr />
							<textarea rows="5" placeholder="I can't be expanded. :("></textarea>
							<hr />
							<button class="btn btn-default">I can be pressed</button>
							</div>
						</div>
						</div>
						</div>
					</div>
					</div>
				</div>
				</div>
				</div>
				</div>
			</div>
		</div>

		<!-- Javascript : SLICK -->
		<script src="<c:url value='/static/js/runSlick.js' />"></script>
		
	</body>
</html>