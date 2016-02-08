<div class="row">
<div class="col-xs-12">
	<a href="#menu-toggle" id="menu-toggle">
		<button type="button" class="btn btn-default btn-lg">
		<span class="glyphicon glyphicon-menu-hamburger"></span>
		</button>
	</a>
</div>
</div>

<!-- Toggle Script -->
<script>
$("#menu-toggle").click(
function(e) 
{
	e.preventDefault();
	$("#wrapper").toggleClass("toggled");
});
</script>