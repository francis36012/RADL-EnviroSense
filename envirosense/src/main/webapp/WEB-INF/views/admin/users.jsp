<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!--<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">-->
<html>
	<head>
		<c:import url="/static/common/head/favicon.jsp" />
		<c:import url="/static/common/head/metaTags.jsp" />
		<c:import url="/static/common/head/jquery.jsp" />
		<c:import url="/static/common/head/bootstrap.jsp" />
		<c:import url="/static/common/head/bootstrapSwitch.jsp" />
		<c:import url="/static/common/head/slick.jsp" />
		<c:import url="/static/common/head/style.jsp" />
		<c:import url="/static/common/head/navbar.jsp" />
		<link rel="stylesheet" type="text/css" href="<c:url value='/static/css/pages/users.css'/>"/>
		<title>Manage Users</title>
	</head>
	
	<body>
		<div id="wrapper">
		
		<!-- SIDEBAR CONTENT -->
		<c:import url="/static/common/navbar/content.jsp" />
		
		<div id="page-content-wrapper">
		<div class="container-fluid nopadding">
			<div class="row">
			<div class="col-xs-12 col-md-6 col-md-offset-3">

				<div class="row page-header">

					<!-- SIDEBAR TOGGLE -->
					<div class="col-xs-3">
						<c:import url="/static/common/navbar/toggle.jsp" />
					</div>
					
					<div class="col-xs-6">
						<h1>Users</h1>
						<small>Let's play Sims.</small>
					</div>
			</div>
			</div>
			</div>
				
			<div class="row">
			<div class="col-xs-12 nopadding">
				<div class="single-items">
					<div class="row">
					<div class="col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<div class="text-center">Settings</div>
						</div>
						
						<div class="panel-body">
							<div class="well well-sm">
								This panel will contain sort functions
								that will sort the data in the other
								panels.
							</div>
						</div>
					</div>
					</div>
					</div>
					
					
					<div class="row">
					<div class="col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<div class="text-center">All Users</div>
						</div>
						<%
							String[] allUsers = {
								"Stephanie Kraus",
								"Sergio Diaz",
								"Francis Agyapong",
								"Daniel Chau",
								"Breno Brezinski",
								"Jediah Dizon"
							};

							for(int index = 0;
								index < allUsers.length;
								index++)
							{
								String currentUser = allUsers[index];
						%>
						<div class="panel-body">
							<div class="row">
								<div class="col-xs-9">
									<div class="usersList" id="<%= currentUser.replaceAll("\\s", "") %>">
									<%= currentUser %>
									</div>
								</div>
									
								<div class="col-xs-3">
									<input type="checkbox" name="dataStatus" data-size="mini" data-on-color="success" />
								</div>
							</div>
						</div>
						<%
							}
						%>

					</div>
					</div>
					</div>
			</div>
			</div>
			</div>
		</div>
		</div>
		</div>
	
		<!--Javasciprt : Utilities -->
		<script type="text/javascript" src="<c:url value='/static/js/utilities.js' />"></script>

		<!-- Javascript : Startup Sequence -->
		<script type="text/javascript" src="<c:url value='/static/js/startup/users.js' />"></script>
	
	</body>
</html>