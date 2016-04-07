<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html>
	<head>
		<c:import url="/static/common/head/favicon.jsp" />
		<c:import url="/static/common/head/metaTags.jsp" />
		<c:import url="/static/common/head/jquery.jsp" />
		<c:import url="/static/common/head/bootstrap.jsp" />
		<c:import url="/static/common/head/bootstrapSwitch.jsp" />
		<c:import url="/static/common/head/style.jsp" />
		<c:import url="/static/common/head/navbar.jsp" />

		<link rel="stylesheet" type="text/css" href="<c:url value='/static/css/pages/events.css'/>" />
		<title>Events</title>
	</head>

	<body>
		<div id="wrapper">
			
			<!-- SIDEBAR CONTENT -->
			<c:import url="/static/common/navbar/content.jsp" />

			<div id="page-content-wrapper">
				<div class="container-fluid nopadding">
					<div class="row">
					<div class="col-xs-12 col-sm-8 col-sm-offset-2">

						<!-- SIDEBAR TOGGLE -->
						<c:import url="/static/common/navbar/toggle.jsp" />

						<div class="row page-header text-center">
							<div class="col-xs-12">
								<h1>Events</h1>
								<!--<small>Let's get notified.</small>-->
							</div>
						</div>
					</div>
					</div>

					<div class="row">
					<div class="col-xs-12 col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3 nopadding">
					<c:choose>
						<c:when test="${events.size() > 0}">
							<div class="panel panel-default">
								<div class="panel-heading text-center">
									Events
								</div>

								<div class="panel-body">
									<div class="dataContainer">
										<c:forEach items="${events}" var="currentEvent">
											<form class="form" role="form">	
												<div class="row">
													<div class="col-xs-12">
														<c:out value="${currentEvent.getName()}" />
													</div>
												</div>
											</form>
										<hr />
										</c:forEach>
									</div>
								</div>
							</div>
						</c:when>

						<c:otherwise>
							<div class="panel panel-default">
								<div class="panel-heading text-center">
								</div>

								<div class="panel-body">
									<div class="row">
										<div class="col-xs-12">
											<div class="alert alert-warning">
												<p>No events are currently stored.</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</c:otherwise>
					</c:choose>
				</div>
				</div>
			</div>
		</div>
	</div>
						
	<!--Javasciprt : AJAX Controller -->
	<script type="text/javascript" src="<c:url value='/static/js/ajax/ajaxController.js' />"></script>

	<!--Javasciprt : AJAX Events -->
	<script type="text/javascript" src="<c:url value='/static/js/ajax/events/dataByEvents.js' />"></script>

	<!--Javasciprt : Utilities -->
	<script type="text/javascript" src="<c:url value='/static/js/utilities.js' />"></script>
	
	<!-- Javascript : Startup Sequence -->
	<script type="text/javascript" src="<c:url value='/static/js/startup/events.js' />"></script>

	</body>
</html>