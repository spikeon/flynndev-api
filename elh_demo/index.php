<!DOCTYPE html>
<?php
	include('../vendor/autoload.php');
?>
<html>
	<head lang="en">
		<meta charset="utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	    <meta http-equiv="x-ua-compatible" content="ie=edge">

		<title>Michael Flynn's Portfolio</title>
		<link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.min.css">
		<link rel="stylesheet" href="/node_modules/tether/dist/css/tether.min.css">
		<link rel="stylesheet" href="/style.min.css">
	</head>

	<body>
		<div class='container'>
			<div class='row'>
				<div class='col-md-3'><button class='btn btn-primary'><i class="fa fa-chevron-left" aria-hidden="true"></i></button></div>
				<div class='col-md-6'>
					<h3>Week of Oct 23 - Oct 29</h3>
				</div>
				<div class='col-md-3'><button class='btn btn-primary'><i class="fa fa-chevron-right" aria-hidden="true"></i></button></div>
			</div>
			<div class='row'>
				<?php
					$days = [
						[
							'day' => 'Sunday',
							'date' => 'Oct 23',
							'times' => [
								'13:00', '13:30', '14:00', '14:30'
							]
						],
						[
							'day' => 'Monday',
							'date' => 'Oct 24',
							'times' => [
								'13:00', '13:30', '14:00', '14:30'
							]
						],
						[
							'day' => 'Tuesday',
							'date' => 'Oct 25',
							'times' => [
								'13:00', '13:30', '14:00', '14:30'
							]
						],
						[
							'day' => 'Wednesday',
							'date' => 'Oct 26',
							'times' => [

							]
						],
						[
							'day' => 'Thursday',
							'date' => 'Oct 27',
							'times' => [
								'13:00', '13:30', '14:00', '14:30'
							]
						],
						[
							'day' => 'Friday',
							'date' => 'Oct 28',
							'times' => [
								'13:00', '13:30', '14:00', '14:30'
							]
						],
						[
							'day' => 'Saturday',
							'date' => 'Oct 29',
							'times' => [

							]
						],


					];

					foreach($days as $i => $day) {
						if($i == 4) echo "</div><div class='row'>";
						?>
						<div class='col-md-3 day'>
							<div class='list-group'>
								<div class='list-group-item active'>
									<div class='row'>
										<div class='col-md-6'><?php echo $day['day']; ?></div>
										<div class='col-md-6 text-xs-right'><?php echo $day['date']; ?></div>
									</div>
								</div>
								<?php if(count($day['times']) == 0) { ?>
									<div class='list-group-item disabled'>
										No Classes Today
									</div>

								<?php } else { foreach($day['times'] as $time) { ?>
									<div class='list-group-item'>
										<div class='row'>
											<div class='col-md-6'><?php echo $time; ?></div>
											<div class="col-md-6 text-xs-right"><a class='btn btn-primary btn-sm' href="#"> Book </a></div>
										</div>
									</div>
								<?php } } ?>

							</div>

						</div>
					<?php } ?>
				</div>
		</div>
		<!-- Do Javascript Last -->
		<script src="/node_modules/jquery/dist/jquery.min.js"></script>
		<script src="/node_modules/tether/dist/js/tether.min.js"></script>
		<script src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
		<script src="/node_modules/fontawesome/index.js"></script>
	</body>
</html>
