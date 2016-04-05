<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div id="sidebar-wrapper">
	<ul class="sidebar-nav text-right">
		<li>
			<img src="<c:url value='/static/images/Elements/Logo/Logo - Medium.png' />" style="width: 33%; margin: 0 37%" />
			<img src="<c:url value='/static/images/Elements/Divider.png' />" class="img-responsive" />
		</li>
		<li><a href="<c:url value='/' />">Live Data</a></li>
		<li><a href="<c:url value='/report' />">Report</a></li>
		<li><a href="<c:url value='/events' />">Events</a></li>
		<li><a href="<c:url value='/admin/users/all' />">Account</a></li>
		
		<li><a href="#adminLinks" data-toggle="collapse">Admin</a></li>
		<li>
			<div id="adminLinks" class="collapse">
				<a href="<c:url value='/admin/events' />"><h4>Events</h4></a>
				<a href="<c:url value='/admin/users' />"><h4>Users</h4></a>
			</div>
		</li>
		
		<li>
			<a href="<c:url value='javascript:{}' />" onclick="document.getElementById('formLogout').submit();">
				<h4>Logout</h4>
			</a>
		</li>
	</ul>
				
	<form id="formLogout" class="form" action="<c:url value='/logout' />" method="POST">
		<input type="hidden" name="<c:out value='${_csrf.parameterName}' />" value="${_csrf.token}" />		
	</form>
</div>


<!-- <div id="page-content-wrapper"> -->