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
		$data = array_merge([
			'id' => ''
			,'class' => ''
			,'style' => ''
			,'attr' => []
			,'dataAttr' => []
		], $data);
		return $data;
	}
}