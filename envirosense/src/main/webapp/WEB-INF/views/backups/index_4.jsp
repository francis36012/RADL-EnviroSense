<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<c:import url="/static/common/head/favicon.jsp" />
		<c:import url="/static/common/head/metaTags.jsp" />
		<c:import url="/static/common/head/jquery.jsp" />
		<c:import url="/static/common/head/bootstrap.jsp" />
		<c:import url="/static/common/head/bootstrapSwitch.jsp" />
		<c:import url="/static/common/head/bootstrapLadda.jsp" />
		<c:import url="/static/common/head/slick.jsp" />
		<c:import url="/static/common/head/style.jsp" />
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
					<div class="col-xs-12 col-sm-8 col-sm-offset-2">

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
						<div id="slickSlides" class="col-xs-12 col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3 nopadding">
						</div>
					</div>
				</div>
			</div>
		</div>

		<!--Javasciprt : AJAX By Sensor Type -->
		<script type="text/javascript" src="<c:url value='/static/js/ajax/liveData/dataBySensorType.js' />"></script>

		<!--Javasciprt : AJAX Controller -->
		<script type="text/javascript" src="<c:url value='/static/js/ajax/ajaxController.js' />"></script>
		
		<!--Javasciprt : AJAX By All Sensors -->
		<script type="text/javascript" src="<c:url value='/static/js/ajax/liveData/dataByAllSensors.js' />"></script>
		
		<!--Javasciprt : Utilities -->
		<script type="text/javascript" src="<c:url value='/static/js/utilities.js' />"></script>

		<!-- Javascript : Startup Sequence -->
		<script type="text/javascript" src="<c:url value='/static/js/startup/liveData.js' />"></script>

	</body>
</html>