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

					<div class="row">
					<div class="col-xs-12">
						<h1>Live Data</h1>
						<small>Let's pick up where you left off.</small>

						<hr />
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
					<div class="panel-body">

						<table class="table">
							<caption>
								<div class="panel-heading">
								<%= "Room " + Math.round(Math.random() * 10) %>
								</div>
							</caption>

							<th>Temperature</th>
							<th>Humidity</th>

							<tr>
							<td><h1><%= Math.round(Math.random() * 100) + "%" %></h1></td>
							<td><h1><%= Math.round(Math.random() * 100) + "%" %></h1></td>
							</tr>
						</table>

						<table class="table">
							<th>Carbon Dioxide</th>
							<th>Harmful Gas</th>

							<tr>
								<td><h1><%= Math.round(Math.random() * 100) + "%" %></h1></td>
								<td><h1><%= Math.round(Math.random() * 100) + "%" %></h1></td>
							</tr>
						</table>

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
							<form action="<c:url value='/home' />" method="POST">
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
									
		<!-- Javascript : SLICK -->
		<script src="<c:url value='/static/js/RunSlick.js' />"></script>
		
	</body>
</html>