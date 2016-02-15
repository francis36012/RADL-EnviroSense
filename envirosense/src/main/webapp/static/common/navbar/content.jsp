<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div id="sidebar-wrapper">
	<ul class="sidebar-nav text-right">
		<li>
			<img src="<c:url value='/static/images/Elements/Logo/Logo - Medium.png' />" class="img-responsive" style="width: 33%; margin: 0 37%" />
			<img src="<c:url value='/static/images/Elements/Divider.png' />" class="img-responsive" />
		</li>
		<li><a href="<c:url value='/' />">Live Data</a></li>
		<li><a href="#">Report</a></li>
		<li><a href="<c:url value='#' />">Events</a></li>
		<li><a href="#">Settings</a></li>
		<li><a href="<c:url value='#' />">Accounts</a></li>
		<li>
			<form id="formLogout" class="form" action="<c:url value='/logout' />" method="POST">
				<a href="<c:url value='javascript:{}' />" onclick="document.getElementById('formLogout').submit();">
					Logout
				</a>
				<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />		
			</form>
		</li>
	</ul>
</div>
		
<!-- <div id="page-content-wrapper"> -->