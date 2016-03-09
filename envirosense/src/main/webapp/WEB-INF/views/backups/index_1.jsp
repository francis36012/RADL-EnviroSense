<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<c:import url="/static/common/head/favicon.jsp" />
		<c:import url="/static/common/head/metaTags.jsp" />
		<c:import url="/static/common/head/jquery.jsp" />
		<c:import url="/static/common/head/bootstrap.jsp" />
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
			<div class="col-xs-12 col-md-6 col-md-offset-3">

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
			<div class="col-xs-12 nopadding">
				<div class="single-items">
					
					<div class="row">
					<div class="col-xs-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<div class="text-center">Settings</div>
						</div>
						
						<div class="panel-body">
							<div class="row">
							<div class="col-xs-12">
								<div class="btn-group-vertical btn-block">
									<a type="button" href="#allSensors" class="btn btn-default btn-block" data-toggle="collapse">All Sensors</a>
								</div>

								<div class="row">
								<div class="col-xs-12">
									<div id="allSensors" class="collapse">
										<form id="allSensorForm" class="reportForm form-horizontal" role="form">
											<br />

											<div class="row form-group">
												<label for="allSensorFromDate" class="col-xs-2 control-label">From</label>
												<div class="col-xs-10">
													<input type="datetime-local" id="allSensorFromDate" class="form-control" required />
												</div>
											</div>

											<div class="row form-group">
												<label for="allSensorToDate" class="control-label col-xs-2">To</label>
												<div class="col-xs-10">
													<input type="datetime-local" id="allSensorToDate" class="form-control" required />
												</div>
											</div>

											<div class="row">
												<div class="col-xs-4 col-xs-offset-8">
													<button type="submit" class="reportButton btn btn-default btn-block ladda-button" value="ALL" 
															data-style="slide-down" 
															data-spinner-color="#333">
														Submit
													</button>
												</div>
											</div>
										</form>
									</div>
								</div>
								</div>
							</div>
							</div>

							<hr />	

							<div class="row">
							<div class="col-xs-12">
								<div class="alert alert-warning">
									Requires internet connectivity to access 
									Google Charts API.
								</div>
							</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			</div>
		</div>
		</div>
	</div>
				
	<!-- Javascript : Startup Sequence-->
	<script src="<c:url value='/static/js/startup.js' />"></script>
	
	<!-- Javascript : SLICK -->
	<script src="<c:url value='/static/js/RunSlick.js' />"></script>
	
	<!-- Javascript : Google Charts -->
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	
	<!--Javasciprt : Utilities -->
	<script src="<c:url value='/static/js/utilities.js' />"></script>
	
	<!--Javasciprt : AJAX By Sensor Type -->
	<script src="<c:url value='/static/js/ajax/dataBySensorType.js' />"></script>
	
	<!--Javasciprt : AJAX By All Sensors -->
	<script src="<c:url value='/static/js/ajax/dataByAllSensors.js' />"></script>
	
	<!--Javasciprt : AJAX Controller -->
	<script src="<c:url value='/static/js/ajax/ajaxController.js' />"></script>
	</body>
</html>