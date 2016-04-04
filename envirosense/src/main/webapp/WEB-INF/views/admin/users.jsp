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

		<link rel="stylesheet" type="text/css" href="<c:url value='/static/css/pages/users.css'/>" />
		<title>Users</title>
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
								<h1>Manage Users</h1>
								<small>Some catch phrase.</small>
							</div>
						</div>
					</div>
					</div>

					<div class="row">
					<div class="col-xs-12 col-sm-6 col-sm-offset-3 nopadding">
						<c:choose>
							<c:when test="${users != null}">
								<c:set var="userCounter" value="1" />
								<input type="hidden" id="csrfProtection" name="<c:out value='${_csrf.parameterName}' />" value="${_csrf.token}" />
								
								<div class="panel panel-default">
									<div class="panel-heading text-center">
										Settings
									</div>

									<div class="panel-body">
										<form class="form" role="form">
											<div class="row">
												<div class="col-xs-12">
													<div class="btn-group btn-group-justified">
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
											</div>
										</form>
									</div>
								</div>

								<div class="panel panel-default">
									<div class="panel-heading text-center">
										Users
									</div>

									<div class="panel-body">
										<div class="dataContainer">
											<c:forEach items="${users}" var="currentUser">
												<form class="form" role="form">
													<div class="row">
														<div class="col-xs-8 col-sm-9">
															<a href="<c:url value='#collapse-${userCounter}' />" data-toggle="collapse">
																<c:out value="${currentUser.getFirstname()} ${currentUser.getLastname()}" />
															</a>
														</div>

														<div class="col-xs-4 col-sm-3">
															<input type="checkbox" name="users" class="bootstrapSwitch"
																data-size="mini"
																data-on-color="success"
																data-user-email="${currentUser.getEmail()}"
																<c:if test="${currentUser.getEnabled()}">
																	<c:out value="checked"/>
																</c:if> 
																/>
														</div>
													</div>

													<!-- NOTE -->
													<!--
														For right now, every attribute found in the User Object is hard coded.
														What we are going to do is get the number of attributes, and create 
														call methods based on those attributes and fill in the proper text box with
														the proper value. If ever that's a good plan or even possible, of course. 
													-->

													<div class="row">
														<div class="col-xs-12">
															<div id="collapse-${userCounter}" class="collapse">
																<br />
																<fieldset class="fieldset form-group">
																	<div class="row">
																		<div class="col-xs-12">
																			<input type="text" class="form-control input-md" value="<c:out value='${currentUser.getFirstname()}' />"/>
																		</div>
																	</div>

																	<div class="row">
																		<div class="col-xs-4 col-xs-offset-8 col-md-3 col-md-offset-9 text-muted text-right">
																			First Name
																		</div>
																	</div>
																</fieldset>

																<fieldset class="fieldset form-group">
																	<div class="row">
																		<div class="col-xs-12">
																			<input type="text" class="form-control input-md" value="<c:out value='${currentUser.getLastname()}' />"/>
																		</div>
																	</div>

																	<div class="row">
																		<div class="col-xs-4 col-xs-offset-8 col-md-3 col-md-offset-9 text-muted text-right">
																			Last Name
																		</div>
																	</div>
																</fieldset>

																<fieldset class="fieldset form-group">
																	<div class="row">
																		<div class="col-xs-12">
																			<input type="email" class="form-control input-md" value="<c:out value='${currentUser.getEmail()}' />"/>
																		</div>
																	</div>

																	<div class="row">
																		<div class="col-xs-4 col-xs-offset-8 col-md-3 col-md-offset-9 text-muted text-right">
																			Email
																		</div>
																	</div>
																</fieldset>

																<fieldset class="fieldset form-group">
																	<div class="row">
																		<div class="col-xs-12">
																			<input type="text" class="form-control input-md" value="<c:out value='${currentUser.getSlackId()}' />"/>
																		</div>
																	</div>

																	<div class="row">
																		<div class="col-xs-4 col-xs-offset-8 col-md-3 col-md-offset-9 text-muted text-right">
																			Slack
																		</div>
																	</div>
																</fieldset>

																<fieldset class="fieldset form-group">
																	<div class="row">
																		<div class="col-xs-12">
																			<input type="text" class="form-control input-md" value="<c:out value='${currentUser.getPhone()}' />"/>
																		</div>
																	</div>

																	<div class="row">
																		<div class="col-xs-4 col-xs-offset-8 col-md-3 col-md-offset-9 text-muted text-right">
																			Phone
																		</div>
																	</div>
																</fieldset>

																<fieldset class="fieldset form-group">
																	<div class="row">
																		<div class="col-xs-12">
																			<div class="btn-group btn-group-justified">
																				<a class="btn btn-default btn-block">
																					Delete
																				</a>

																				<a class="btn btn-default btn-block">
																					Revert
																				</a>

																				<a class="btn btn-success btn-block">
																					Save
																				</a>
																			</div>
																		</div>
																	</div>
																</fieldset>
																		
																<div class="row">
																	<div class="col-xs-12">
																		<a href="<c:url value='#collapse-${userCounter}' />" class="btn btn-default btn-sm btn-block" data-toggle="collapse">
																			<span class="glyphicon glyphicon-menu-up"></span>
																		</a>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</form>
												<hr />
												<c:set var="userCounter" value="${userCounter + 1}" />
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
													<p>No users are currently stored.</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</c:otherwise>
						</c:choose>
								
						<div class="panel panel-default">
							<div class="panel-heading text-center">
								Create User
							</div>

							<div class="panel-body">
								<a href="#createUser" class="btn btn-default btn-block" data-toggle="collapse">
									<span class="glyphicon glyphicon-plus"></span>
								</a>


								<form class="form" role="form">
									<div class="row">
										<div class="col-xs-12">
												<div id="createUser" class="collapse">
													<br />
													<fieldset class="fieldset form-group">
														<div class="row">
															<div class="col-xs-12">
																<input type="text" class="form-control input-md" />
															</div>
														</div>

														<div class="row">
															<div class="col-xs-4 col-xs-offset-8 col-md-3 col-md-offset-9 text-muted text-right">
																First Name
															</div>
														</div>
													</fieldset>

													<fieldset class="fieldset form-group">
														<div class="row">
															<div class="col-xs-12">
																<input type="text" class="form-control input-md" />
															</div>
														</div>

														<div class="row">
															<div class="col-xs-4 col-xs-offset-8 col-md-3 col-md-offset-9 text-muted text-right">
																Last Name
															</div>
														</div>
													</fieldset>

													<fieldset class="fieldset form-group">
														<div class="row">
															<div class="col-xs-12">
																<input type="email" class="form-control input-md" />
															</div>
														</div>

														<div class="row">
															<div class="col-xs-4 col-xs-offset-8 col-md-3 col-md-offset-9 text-muted text-right">
																Email
															</div>
														</div>
													</fieldset>

													<fieldset class="fieldset form-group">
														<div class="row">
															<div class="col-xs-12">
																<input type="text" class="form-control input-md" />
															</div>
														</div>

														<div class="row">
															<div class="col-xs-4 col-xs-offset-8 col-md-3 col-md-offset-9 text-muted text-right">
																Slack
															</div>
														</div>
													</fieldset>

													<fieldset class="fieldset form-group">
														<div class="row">
															<div class="col-xs-12">
																<input type="text" class="form-control input-md" />
															</div>
														</div>

														<div class="row">
															<div class="col-xs-4 col-xs-offset-8 col-md-3 col-md-offset-9 text-muted text-right">
																Phone
															</div>
														</div>
													</fieldset>

													<fieldset class="fieldset form-group">
														<div class="row">
															<div class="col-xs-12">
																<div class="btn-group btn-group-justified">
																	<a class="btn btn-default btn-block">
																		Delete
																	</a>

																	<a class="btn btn-default btn-block">
																		Revert
																	</a>

																	<a class="btn btn-success btn-block">
																		Save
																	</a>
																</div>
															</div>
														</div>
													</fieldset>

													<div class="row">
														<div class="col-xs-12">
															<a href="#createUser" class="btn btn-default btn-sm btn-block" data-toggle="collapse">
																<span class="glyphicon glyphicon-menu-up"></span>
															</a>
														</div>
													</div>
												</div>
										</div>
									</div>
								</form>
							</div>
						</div>
								
					</div>
					</div>
				</div>
			</div>
		</div>
						
		<!--Javasciprt : AJAX Controller -->
		<script type="text/javascript" src="<c:url value='/static/js/ajax/ajaxController.js' />"></script>
		
		<!--Javasciprt : AJAX Users -->
		<script type="text/javascript" src="<c:url value='/static/js/ajax/users/dataByUsers.js' />"></script>

		<!--Javasciprt : Utilities -->
		<script type="text/javascript" src="<c:url value='/static/js/utilities.js' />"></script>

		<!-- Javascript : Startup Sequence -->
		<script type="text/javascript" src="<c:url value='/static/js/startup/users.js' />"></script>
	</body>
</html>