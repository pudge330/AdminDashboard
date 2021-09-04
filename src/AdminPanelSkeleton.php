<?php
namespace BAG\AdminPanelSkeleton;

class AdminPanelSkeleton {
	public static function render($data) {
		ob_start();
		include __DIR__ . '/../php/skeleton.html.php';
		$contents = ob_get_contents();
		ob_end_clean();
		return $contents;
	}
	public static function renderPartial($path, $data) {
		ob_start();
		include $path;
		$contents = ob_get_contents();
		ob_end_clean();
		return $contents;
	}
	public static function attr($data, $prefix = null) {
		$attrString = '';
		foreach ($data as $k => $v)
			$attrString .= $v !== null ? " {$prefix}{$k}=\"{$v}\"" : " {$prefix}{$k}";
		return $attrString;
	}
	public static function defaults($data) {
		return array_merge([
			'id' => ''
			,'class' => ''
			,'style' => ''
			,'attr' => []
			,'dataAttr' => []
		], $data);
	}
	public static function icon($name) {
		$icons = [
			'arrow_down' => '<svg class="ion_ios-arrow-down" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><polygon class="layer_1" points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 "></polygon></svg>',
			'navicon' => '<svg class="ion_navicon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><rect class="layer_1" x="96" y="241" width="320" height="32"></rect><rect class="layer_2" x="96" y="145" width="320" height="32"></rect><rect class="layer_3" x="96" y="337" width="320" height="32"></rect></g></svg>',
			'lock' => '<svg class="ion_locked" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path class="layer_1" d="M86.4,480h339.2c12.3,0,22.4-9.9,22.4-22.1V246c0-12.2-10-22-22.4-22H404v-30.9c0-41.5-16.2-87.6-42.6-115.4
  C335.1,49.9,297.4,32,256.1,32c-0.1,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c-41.3,0-79,17.9-105.3,45.6c-26.4,27.8-42.6,73.9-42.6,115.4V224
  H89h-2.6C74,224,64,233.9,64,246v211.9C64,470.1,74,480,86.4,480z M161,193.1c0-27.3,9.9-61.1,28.1-80.3l0,0l0-0.3
  C206.7,93.9,231,83,255.9,83h0.1h0.1c24.9,0,49.2,10.9,66.8,29.5l0,0.2l-0.1,0.1c18.3,19.2,28.1,53,28.1,80.3V224h-17.5h-155H161 V193.1z"></path></svg>',
			'grid' => '<svg class="ion_grid" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path class="layer_1" d="M160,153.3c0,3.7-3,6.7-6.7,6.7h-50.5c-3.7,0-6.7-3-6.7-6.7v-50.5c0-3.7,3-6.7,6.7-6.7h50.5c3.7,0,6.7,3,6.7,6.7V153.3z"></path><path class="layer_2" d="M288,153.3c0,3.7-3,6.7-6.7,6.7h-50.5c-3.7,0-6.7-3-6.7-6.7v-50.5c0-3.7,3-6.7,6.7-6.7h50.5c3.7,0,6.7,3,6.7,6.7V153.3z"></path><path class="layer_3" d="M416,153.3c0,3.7-3,6.7-6.7,6.7h-50.5c-3.7,0-6.7-3-6.7-6.7v-50.5c0-3.7,3-6.7,6.7-6.7h50.5c3.7,0,6.7,3,6.7,6.7V153.3z"></path></g><g><path class="layer_4" d="M160,281.3c0,3.7-3,6.7-6.7,6.7h-50.5c-3.7,0-6.7-3-6.7-6.7v-50.5c0-3.7,3-6.7,6.7-6.7h50.5c3.7,0,6.7,3,6.7,6.7V281.3z"></path><path class="layer_5" d="M288,281.3c0,3.7-3,6.7-6.7,6.7h-50.5c-3.7,0-6.7-3-6.7-6.7v-50.5c0-3.7,3-6.7,6.7-6.7h50.5c3.7,0,6.7,3,6.7,6.7V281.3z"></path><path class="layer_6" d="M416,281.3c0,3.7-3,6.7-6.7,6.7h-50.5c-3.7,0-6.7-3-6.7-6.7v-50.5c0-3.7,3-6.7,6.7-6.7h50.5c3.7,0,6.7,3,6.7,6.7V281.3z"></path></g><g><path class="layer_7" d="M160,409.3c0,3.7-3,6.7-6.7,6.7h-50.5c-3.7,0-6.7-3-6.7-6.7v-50.5c0-3.7,3-6.7,6.7-6.7h50.5c3.7,0,6.7,3,6.7,6.7V409.3z"></path><path class="layer_8" d="M288,409.3c0,3.7-3,6.7-6.7,6.7h-50.5c-3.7,0-6.7-3-6.7-6.7v-50.5c0-3.7,3-6.7,6.7-6.7h50.5c3.7,0,6.7,3,6.7,6.7V409.3z"></path><path class="layer_9" d="M416,409.3c0,3.7-3,6.7-6.7,6.7h-50.5c-3.7,0-6.7-3-6.7-6.7v-50.5c0-3.7,3-6.7,6.7-6.7h50.5c3.7,0,6.7,3,6.7,6.7V409.3z"></path></g></g></svg>',
			'chevron_down' => '<svg class="ion_chevron-down" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path class="layer_1" d="M256,298.3L256,298.3L256,298.3l174.2-167.2c4.3-4.2,11.4-4.1,15.8,0.2l30.6,29.9c4.4,4.3,4.5,11.3,0.2,15.5L264.1,380.9
  c-2.2,2.2-5.2,3.2-8.1,3c-3,0.1-5.9-0.9-8.1-3L35.2,176.7c-4.3-4.2-4.2-11.2,0.2-15.5L66,131.3c4.4-4.3,11.5-4.4,15.8-0.2L256,298.3 z"></path></svg>',
			'sidemenu' => '<svg width="100%" height="100%" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path d="M32,48l24,0l0,-5.333l-24,0l0,5.333Zm0,-13.333l24,0l0,-5.334l-24,0l0,5.334Zm0,-18.667l0,5.333l24,0l0,-5.333l-24,0Z" style="fill-rule:nonzero;"></path><g><path d="M13.536,28.465l-3.536,3.535l3.536,3.536l3.535,-3.536l-3.535,-3.535Z"></path><path d="M12.582,34.59l8.486,8.486l3.535,-3.536l-8.485,-8.485l-3.536,3.535Z"></path><path d="M21.068,20.924l-8.486,8.486l3.536,3.535l8.485,-8.485l-3.535,-3.536Z"></path></g></svg>'
		];
		return array_key_exists($name, $icons) ? $icons[$name] : '';
	}
}