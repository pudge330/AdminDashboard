<?php
namespace SkeletonWidget;

if (!class_exists('SkeletonWidget\\SkeletonWidget')) {
	class SkeletonWidget {
		public static function render($path, $data) {
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
}