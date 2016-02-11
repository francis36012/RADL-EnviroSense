<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<c:import url="/static/common/head/favicon.jsp" />
		<c:import url="/static/common/head/metaTags.jsp" />
		<c:import url="/static/common/head/bootstrap.jsp" />
		<c:import url="/static/common/head/slick.jsp" />
		<c:import url="/static/common/head/customStyle.jsp" />
		<c:import url="/static/common/head/navbar.jsp" />

		<title>EnviroSense</title>
	</head>

	<body>
    <div id="wrapper">
		
		<!-- SIDEBAR CONTENT -->
		<c:import url="/static/common/navbar/content.jsp" />
		
		<div id="page-content-wrapper">
		<div class="container-fluid nopadding">
			<div class="row">
			<div class="col-xs-12 col-md-6 col-md-offset-3">

				<!-- SIDEBAR TOGGLE -->
				<c:import url="/static/common/navbar/toggle.jsp" />

				<div class="row page-header">
				<div class="col-xs-12">
					<h1>Live Data</h1>
					<small>Let's pick up where you left off.</small>
				</div>
			</div>
			</div>
			</div>
			
			<div class="row">
			<div class="col-xs-12 nopadding">
				<div class="single-items">

				<%
				for (int index = 0;
					index < 5;
					index++)
				{
				%>
					<div class="row">
					<div class="col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<div class="text-center">Room <%= index + 1 %></div>
						</div>
						
						<div class="panel-body">
							<div class="row">
								<div class="col-xs-6">
									<h5>Temperature</h5>
								</div>
								<div class="col-xs-6">
									<h5>Humidity</h5>
								</div>
							</div>
							
							<div class="row">
								<div class="col-xs-6">
									<h1><%= Math.round(Math.random() * 100) + "%" %></h1>
								</div>
								<div class="col-xs-6">
									<h1><%= Math.round(Math.random() * 100) + "%" %></h1>
								</div>
							</div>
								
							<div class="row">
								<div class="col-xs-6">
									<h5>Carbon Dioxide</h5>
								</div>
								<div class="col-xs-6">
									<h5>Harmful Gasses</h5>
								</div>
							</div>
								
							<div class="row">
								<div class="col-xs-6">
									<h1><%= Math.round(Math.random() * 100) + "%" %></h1>
								</div>
								<div class="col-xs-6">
									<h1><%= Math.round(Math.random() * 100) + "%" %></h1>
								</div>
							</div>
							
							<hr />

							<div class="well well-sm">
								<p>
								This panel will contain data from the
								sensors through the use of an API.
								</p>
							</div>
						</div>
					</div>
					</div>
					</div>
				<%
				}
				%>

					<div class="row">
					<div class="col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading">
								<img src="<c:url value='https://goo.gl/DEhnOo' />" class="img-responsive" />
						</div>
						<div class="panel-body">
							<img src="<c:url value='https://goo.gl/DEhnOo' />" class="img-responsive" />
							<img src="<c:url value='https://goo.gl/DEhnOo' />" class="img-responsive" />
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

							<!-- Random Form -->
							<div class="row">
							<div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3">
								<form method="POST">
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
							<textarea rows="5" placeholder="I'm buggy whenever I get expanded. :("></textarea>
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
	
	<!-- Javascript : SLICK -->
	<script src="<c:url value='/static/js/RunSlick.js' />"></script>
	
	</body>
</html>