<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html>
	<head>
		<c:import url="/static/common/head/favicon.jsp" />
		<c:import url="/static/common/head/metaTags.jsp" />
		<c:import url="/static/common/head/jquery.jsp" />
		<c:import url="/static/common/head/bootstrap.jsp" />
		<c:import url="/static/common/head/bootstrapSwitch.jsp" />
		<c:import url="/static/common/head/bootstrapLadda.jsp" />
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

						<div class="row page-header text-center">
							<div class="col-xs-12">
								<h1>Users</h1>
								
							</div>
						</div>
						
						<div class="row">
							<div class="col-xs-12 col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4">
							<!-- SIDEBAR TOGGLE -->
							<c:import url="/static/common/navbar/toggle.jsp" />	
							</div>
						</div>
					</div>
					</div>

					<div class="row">
						<div class="col-xs-12 col-sm-6 col-sm-offset-3 nopadding">
							<input type="hidden" id="csrfProtection" name="<c:out value='${_csrf.parameterName}' />" value="${_csrf.token}" />
							<div class="panel panel-default">
								<div class="panel-heading text-center">
									Create User
								</div>

								<div class="panel-body">
									<a href="#createUser" class="btn btn-default btn-block" data-toggle="collapse">
										<span class="glyphicon glyphicon-plus"></span>
									</a>


									<form class="form userForm" role="form">
										<div class="row">
											<div class="col-xs-12">
													<div id="createUser" class="collapse">
														<br />

														<fieldset class="fieldset form-group">
															<div class="row">
																<div class="col-xs-12">
																	<input type="text" name="firstname" class="form-control input-md" />
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
																	<input type="text" name="lastname" class="form-control input-md" />
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
																	<input type="email" name="email" class="form-control input-md" />
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
																	<input type="text" name="slackId" class="form-control input-md" />
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
																	<input type="text" name="phone" class="form-control input-md" />
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
																	<input type="password" name="password" class="form-control input-md" />
																</div>
															</div>

															<div class="row">
																<div class="col-xs-4 col-xs-offset-8 col-md-3 col-md-offset-9 text-muted text-right">
																	Password
																</div>
															</div>
														</fieldset>

														<fieldset>
															<input type="checkbox" name="enabled" checked="checked" style="display:none" />
														</fieldset>

														<fieldset class="fieldset form-group">
															<div class="row">
																<div class="col-xs-12">
																	<div class="btn-group btn-group-justified">
																		<a name="revert" class="btn btn-default btn-block ladda-button" 
																			data-spinner-color="#333" 
																			data-style="slide-down">
																			Revert
																		</a>

																		<a name="create" class="btn btn-success btn-block ladda-button" 
																			data-spinner-color="#333" 
																			data-style="slide-down">
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
							
						<c:choose>
							<c:when test="${users != null}">
								<c:set var="userCounter" value="1" />

								<div class="panel panel-default">
									<div class="panel-heading text-center">
										Settings
									</div>

									<div class="panel-body">
										<form class="form" role="form">
											<div class="btn-group btn-group-justified">
												<a id="disableAll" class="btn btn-default btn-block"
													data-switch-toggle="state"
													data-switch-value="false"
													data-radio-all-off="true"
												>Disable All</a>

												<a id="enableAll" class="btn btn-success btn-block" 
													data-switch-toggle="state"
													data-switch-value="true"
												>Enable All</a>
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
												<form class="form userForm" role="form">
													<div class="row">
														<div class="col-xs-8 col-sm-9">
															<a href="<c:url value='#collapse-${userCounter}' />" data-toggle="collapse">
																<c:out value="${currentUser.getFirstname()} ${currentUser.getLastname()}" />
															</a>
														</div>

														<div class="col-xs-4 col-sm-3">
															<input type="checkbox" name="enabled" class="bootstrapSwitch"
																data-size="mini"
																data-on-color="success"
																<c:if test="${currentUser.getEnabled()}">
																	<c:out value="checked"/>
																</c:if> 
																/>
														</div>
													</div>

													<div class="row">
														<div class="col-xs-12">
															<div id="collapse-<c:out value='${userCounter}' />" class="collapse">
																<br />
																
																<fieldset class="fieldset form-group">
																	<div class="row">
																		<div class="col-xs-12">
																			<input type="text" class="form-control input-md" name="firstname" value="<c:out value='${currentUser.getFirstname()}' />"/>
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
																			<input type="text" class="form-control input-md" name="lastname" value="<c:out value='${currentUser.getLastname()}' />"/>
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
																			<input type="email" class="form-control input-md" name="email" value="<c:out value='${currentUser.getEmail()}' />"/>
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
																			<input type="text" class="form-control input-md" name="slackId" value="<c:out value='${currentUser.getSlackId()}' />"/>
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
																			<input type="tel" class="form-control input-md" name="phone" value="<c:out value='${currentUser.getPhone()}' />"/>
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
																			<input type="password" class="form-control input-md" name="password" value="" />
																		</div>
																	</div>

																	<div class="row">
																		<div class="col-xs-4 col-xs-offset-8 col-md-3 col-md-offset-9 text-muted text-right">
																			Password
																		</div>
																	</div>
																</fieldset>

																<fieldset class="fieldset form-group">
																	<div class="row">
																		<div class="col-xs-12">
																			<div class="btn-group btn-group-justified">
																				<a name="delete" class="btn btn-danger btn-block ladda-button" 
																					data-spinner-color="#333" 
																					data-style="slide-down">
																					Delete
																				</a>

																				<a name="revert" class="btn btn-default btn-block ladda-button" 
																					data-spinner-color="#333" 
																					data-style="slide-down">
																					Revert
																				</a>

																				<a name="save" class="btn btn-success btn-block ladda-button" 
																					data-spinner-color="#333" 
																					data-style="slide-down">
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
					</div>
					</div>
				</div>
			</div>
		</div>
		
		<c:import url="/static/common/popup.jsp" />
		
		<!--Javasciprt : Utilities -->
		<script type="text/javascript" src="<c:url value='/static/js/utilities.js' />"></script>
						
		<!--Javasciprt : AJAX Controller -->
		<script type="text/javascript" src="<c:url value='/static/js/ajax/ajaxController.js' />"></script>
		
		<!--Javasciprt : AJAX Users -->
		<script type="text/javascript" src="<c:url value='/static/js/ajax/users/dataByUsers.js' />"></script>

		<!-- Javascript : Startup Sequence -->
		<script type="text/javascript" src="<c:url value='/static/js/startup/users.js' />"></script>
	</body>
</html>