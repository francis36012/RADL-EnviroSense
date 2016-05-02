<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div id="sidebar-wrapper">
	<ul class="sidebar-nav text-right">
		<li>
			<div class="row">
				<div class="col-xs-6 col-xs-offset-3">
					<img src="<c:url value='/static/images/Elements/Logo/Logo - Medium.png' />" class="img-responsive" />
				</div>
			</div>
			<img src="<c:url value='/static/images/Elements/Divider.png' />" class="img-responsive" />
		</li>
		<li><a href="<c:url value='/' />" class="ladda-button" data-spinner-color="#CCCCCC" data-style="slide-down">
				Live Data
			</a>
		</li>
		<li><a href="<c:url value='/report' />" class="ladda-button" data-spinner-color="#CCCCCC" data-style="slide-down">
				Report
			</a>
		</li>
		<li><a href="<c:url value='/events' />" class="ladda-button" data-spinner-color="#CCCCCC" data-style="slide-down">
				Events
			</a>
		</li>
		
		<li>
			<a href="#adminLinks" data-toggle="collapse">Admin</a>
			<div id="adminLinks" class="collapse">
				<a href="<c:url value='/admin/events' />" class="ladda-button" data-spinner-color="#CCCCCC" data-style="slide-down">
					<h5>Events</h5>
				</a>
				<a href="<c:url value='/admin/users/all' />" class="ladda-button" data-spinner-color="#CCCCCC" data-style="slide-down">
					<h5>Users</h5>
				</a>
			</div>
			<img src="<c:url value='/static/images/Elements/Divider.png' />" class="img-responsive" />
		</li>
		
		<li>
			<a href="<c:url value='javascript:{}' />" onclick="document.getElementById('formLogout').submit();">
				Logout
			</a>
		</li>
	</ul>
				
	<form id="formLogout" class="form" action="<c:url value='/logout' />" method="POST">
		<input type="hidden" name="<c:out value='${_csrf.parameterName}' />" value="${_csrf.token}" />		
	</form>
</div>

<!-- <div id="page-content-wrapper"> -->