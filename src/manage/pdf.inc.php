<?php
require($gsetting['tcpdfPath'] . 'tcpdf.php');



//Class: customized PDF
class CPDF extends TCPDF
{
	protected $footerPos;
	protected $footerPat;

	function __construct($direction)
	{
		parent::__construct($direction);
	}

	public function SetFooterPos($footerPos)
	{
		$this->footerPos = $footerPos;
	}

	public function SetFooterPat($footerPat)
	{
		$this->footerPat = $footerPat;
	}

	public function Footer()
	{
		$this->SetY($this->footerPos);
		$this->SetFont('nsh', '', 7);

		$pat = $this->footerPat;
		$pat = str_replace('%CPAGE%', $this->getPageNumGroupAlias(), $pat);
		$pat = str_replace('%TPAGE%', $this->getPageGroupAlias(), $pat);

		$this->writeHTML($pat, false, false, false, false, '');
	}
}

//Function: create a PDF
function createPDF($direction, $author, $title, $footerPat, $eTopMargin, $eBottomMargin, $eLeftMargin, $eRightMargin)
{
	$pdf = new CPDF($direction);
	$pdf->SetCreator('riwy.com');
	$pdf->SetAuthor($author);
	$pdf->SetTitle($title);
	$pdf->SetMargins($eLeftMargin, $eTopMargin, $eRightMargin);
	$pdf->setPrintHeader(false);
	$pdf->SetAutoPageBreak(TRUE, $eBottomMargin);
	$pdf->SetFont('nsh', '', 7);
	$pdf->SetFooterPos(-$eBottomMargin);
	$pdf->SetFooterPat($footerPat);
	return $pdf;
}

//Function: prepare a PDF
function preparePDF($pdf)
{	
	$pdf->startPageGroup();
	$pdf->AddPage();
}

//Function: get a PDF
function getPDF($pdf)
{
	return $pdf->Output('', 'S');
}

//Function: flush a PDF
function flushPDF($pdf, $fileName)
{
	$pdf->Output($fileName, 'D');
}

//Function: save a PDF
function savePDF($pdf, $fileName)
{
	$pdf->Output($fileName, 'F');
}

//Function: write a PDF
function writePDF($pdf, $html)
{
	$pdf->writeHTML($html, false, false, false, false, '');
}

//Function: write bar code
function writeBarcode($pdf, $barCode, $style, $height, $unit)
{
	$pdf->write1DBarcode($barCode, 'C128C', '', '', '', $height, $unit, $style, 'N');
}

//Function: write QR code
function writeQrcode($pdf, $qrCode, $style, $height)
{
	$pdf->write2DBarcode($qrCode, 'QRCODE,L', '', '', $height, $height, $style, 'N');
}
?>