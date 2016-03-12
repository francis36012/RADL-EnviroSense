<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

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
	<link rel="stylesheet" type="text/css" href="<c:url value='/static/css/pages/events.css'/>" />
	<title>Manage Events</title>
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
									<h1>Manage Events</h1>
									<small>Let's get notified.</small>
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
													This panel will contain sort functions that will sort the data in the other panels.
												</div>
											</div>
										</div>
									</div>

									<div class="col-xs-3">
										<input type="checkbox" class="bootstrapSwitch" data-size="mini" data-on-color="success" />
									</div>
								</div>

								<div class="row">
									<div class="col-xs-12">
										<div class="panel panel-default">
											<div class="panel-heading">
												<div class="text-center">All Events</div>
											</div>
											
											<c:forEach items="${events}" var="currentEvent">
											<div class="panel-body">
												<div class="row">
													<div class="col-xs-9">
														<div class="eventsList">
															ID: '<c:out value="${currentEvent.getId()}"/>'
															<c:out value="${currentEvent.getName()}" />
														</div>
													</div>
													<div class="col-xs-3">
														<input type="checkbox" name="dataStatus" 
															   data-size="mini" 
															   data-on-color="success"
															   <c:if test='${currentEvent.active}'>
																   <c:out value='checked' />
															   </c:if>
															   />
													</div>
												</div>
											</div>
											</c:forEach>
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

		<!-- Javascript : BOOTSTRAP SWITCH -->
		<script src="<c:url value='/static/js/RunBootstrapSwitch.js' />"></script>
	</body>
</html>