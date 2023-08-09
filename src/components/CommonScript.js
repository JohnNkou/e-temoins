export default function CommonScript({children}){
	return <>
		<script src="/vendor/global/global.min.js"></script>
		<script src="/vendor/bootstrap-select/dist/js/bootstrap-select.min.js"></script>
		<script src="/vendor/chart.js/Chart.bundle.min.js"></script>
				
		{<script src="js/custom.min.js"></script>}
		<script src="/js/deznav-init.js"></script>
		<script src="/js/demo.js"></script>
		{<script src="js/styleSwitcher.js"></script>}

		{children}
	</>
}