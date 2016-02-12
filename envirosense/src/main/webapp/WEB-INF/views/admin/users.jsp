<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!--<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">-->
<html>
	<head>
		<c:import url="/static/common/head/favicon.jsp" />
		<c:import url="/static/common/head/metaTags.jsp" />
		<c:import url="/static/common/head/bootstrap.jsp" />
		<c:import url="/static/common/head/slick.jsp" />
		<c:import url="/static/common/head/customStyle.jsp" />
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

				<!-- SIDEBAR TOGGLE -->
				<c:import url="/static/common/navbar/toggle.jsp" />

				<div class="row page-header">
				<div class="col-xs-12">
					<h1>Manage Users</h1>
					<small>Let's pick up where you left off.</small>
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
							<div class="userList" id="<%= allUsers[index].replaceAll("\\s", "") %>">
								<%= allUsers[index] %>
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
	
	<!-- Javascript : SLICK -->
	<script src="<c:url value='/static/js/RunSlick.js' />"></script>
	
	</body>
</html>