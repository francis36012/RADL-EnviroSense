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
					<div class="col-xs-12 col-sm-6 col-sm-offset-3">

						<!-- SIDEBAR TOGGLE -->
						<c:import url="/static/common/navbar/toggle.jsp" />

						<div class="row page-header">
							<div class="col-xs-12">
								<h1>Manage Events</h1>
								<small>Let's get notified.</small>
							</div>
						</div>
					</div>
					</div>

					<div class="row">
					<div class="col-xs-12 col-sm-6 col-sm-offset-3 nopadding">
						<c:choose>
							<c:when test="${events != null}">
								<div class="row">
								<div class="col-xs-12">
									<div class="panel panel-default">
										<div class="panel-heading text-center">
											Settings
										</div>

										<div class="panel-body">
											<form action="/api/event" method="POST">
												<div class="row">
													<div class="col-xs-12 btn-group btn-group-justified">
													<a id="disableAll" class="btn btn-danger btn-block"
														data-switch-toggle="state"
														data-switch-value="false"
														data-radio-all-off="true"
													>Disable All</a>
													
													<a id="enableAll" class="btn btn-success btn-block" 
														data-switch-toggle="state"
														data-switch-value="true"
														>Enable All</a>
													</div>
												</div>
											</form>
										</div>
									</div>

									<div class="panel panel-default">
										<div class="panel-heading text-center">
											Events
										</div>

										<div class="panel-body">
											<div class="dataContainer">
												<c:forEach items="${events}" var="currentEvent">
													<form>
													<div class="row">
														<div class="col-xs-9">
															<c:out value="${currentEvent.getName()}" />
														</div>

														<div class="col-xs-3">
															<input type="checkbox" name="event"
																class="bootstrapSwitch"
																data-size="mini"
																data-on-color="success"
																data-event-id="${currentEvent.getId()}"
																data-event-name="${currentEvent.getName()}"
																<c:if test="${currentEvent.isActive()}">
																	<c:out value="checked"/>
																</c:if>
															/>
														</div>
													</div>
													</form>
												</c:forEach>
											</div>
										</div>
									</div>
								</div>
								</div>
							</c:when>

							<c:otherwise>
								<div class="row">
								<div class="col-xs-12">
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
		<script type="text/javascript" src="<c:url value='/static/js/ajax/event/dataByEvents.js' />"></script>

		<!--Javasciprt : Utilities -->
		<script type="text/javascript" src="<c:url value='/static/js/utilities.js' />"></script>

		<!-- Javascript : Startup Sequence -->
		<script type="text/javascript" src="<c:url value='/static/js/startup/events.js' />"></script>
	</body>
</html>
