<?php
//Function: prepare a list of invoices
function prepareInvoice($IDList, $profileID, $setting)
{
	global $gsetting;
	global $siteID, $sitePosition, $siteHost, $siteName, $siteEmail;
	global $arrEncodeStr;
	global $cuID;

	//Get the profile
	$rs = query('Select * from `' . $sitePosition . '.Profile` where `ID` = ' . $profileID, false);
	$rsInfo = fetchRow($rs);
	freeResult($rs);
	if($rsInfo === null || $rsInfo[2] != 2) return null;
	$title = $rsInfo[3];
	$eTopMargin = $rsInfo[4];
	$eBottomMargin = $rsInfo[5];
	$eLeftMargin = $rsInfo[6];
	$eRightMargin = $rsInfo[7];
	$html = $rsInfo[8];

	//Prepare the algorithm
	if(count($setting) > 4 && $setting[4] != '')
	{
		require($gsetting['pslibPath'] . 'Crypt/RSA.php');
		require($gsetting['pslibPath'] . 'Math/BigInteger.php');
		require($gsetting['pslibPath'] . 'Crypt/Hash.php');
		require($gsetting['pslibPath'] . 'Crypt/Random.php');

		$rsa = new \phpseclib\Crypt\RSA();
		if(!$rsa->loadKey($setting[4])) return null;
	}

	//Prepare the HTML
	$htmlArr = explode('|', $html);
	if(count($htmlArr) < 9 || strlen($htmlArr[8]) < 2) return null;
	$footerPat = $htmlArr[7];
	$locts = substr($htmlArr[8], 0, 1);
	$locds = substr($htmlArr[8], 1, 1);

	//Create the invoice
	$invoice = createPDF('P', $siteName, $title, $footerPat, $eTopMargin, $eBottomMargin, $eLeftMargin, $eRightMargin);

	//Lock tables
	query('Lock tables `' . $sitePosition . '.Order` O read, `' . $sitePosition . '.Invoice` I read, `' . $sitePosition . '.Element` read', false);

	//Print the invoice
	$rs = query('Select I.*, O.`UserID` from `' . $sitePosition . '.Invoice` I inner join `' . $sitePosition . '.Order` O on I.`OrderID` = O.`ID` where O.`UserID` = ' . $cuID . ' and I.`ID` in (' . $IDList . ')', true);
	while(true)
	{
		$rsInfo = fetchRow($rs);
		if($rsInfo === null) break;

		$dateInfo = getdate($rsInfo[7]);
		$stArr = array(
			'%SITEHOST%' => strtr($siteHost, $arrEncodeStr),
			'%SITENAME%' => strtr($siteName, $arrEncodeStr),
			'%SITEEMAIL%' => $siteEmail,
			'%IID%' => $rsInfo[0],
			'%OID%' => $rsInfo[1],
			'%UID%' => $rsInfo[8],
			'%ADDRESS%' => strtr(encodeAddress($rsInfo[5]), $arrEncodeStr),
			'%EXTRA_ADDRESS%' => strtr(encodeAddress($rsInfo[6] == '' ? $rsInfo[5] : $rsInfo[6]), $arrEncodeStr),
			'%YEAR%' => $dateInfo['year'],
			'%MONTH%' => ($dateInfo['mon'] < 10 ? '0' : '') . $dateInfo['mon'],
			'%DATE%' => ($dateInfo['mday'] < 10 ? '0' : '') . $dateInfo['mday']
		);
		$htmlArr = explode('|', strtr($html, $stArr));
		$codeStr = array();
		$codeStr[] = $rsInfo[0] . '$' . $rsInfo[1] . '$' . $rsInfo[8] . '$' . $rsInfo[7] . '$' . $rsInfo[5] . '$' . $rsInfo[6];

		$esum = 0;
		$tsum = 0;
		$num = 0;
		$htmlStr = array();
		$htmlStr[] = $htmlArr[3];
		$ers = query('Select * from `' . $sitePosition . '.Element` where `InvoiceID` = ' . $rsInfo[0] . ' order by `ShowID`', false);
		while(true)
		{
			$ersInfo = fetchRow($ers);
			if($ersInfo === null) break;

			$iesum = $ersInfo[9] * $ersInfo[11];
			$itsum = ceil($ersInfo[9] * (1000 + $ersInfo[10]) / 1000) * $ersInfo[11];
			$esum += $iesum;
			$tsum += $itsum;
			$num += $ersInfo[11];
			$istArr = array( 
				'%ID%' => strtr($ersInfo[1], $arrEncodeStr),
				'%TITLE%' => strtr($ersInfo[5], $arrEncodeStr),
				'%SUBTITLE%' => strtr($ersInfo[6], $arrEncodeStr),
				'%NAME%' => strtr($ersInfo[7], $arrEncodeStr),
				'%SUBNAME%' => strtr($ersInfo[8], $arrEncodeStr),
				'%EPRICE%' => number_format($ersInfo[9] / 100, 2, $locds, $locts),
				'%TPRICE%' => number_format(ceil($ersInfo[9] * (1000 + $ersInfo[10]) / 1000) / 100, 2, $locds, $locts),
				'%ATAX%' => number_format($ersInfo[10] / 1000, 3, $locds, $locts),
				'%PTAX%' => number_format($ersInfo[10] / 10, 1, $locds, $locts),
				'%NUM%' => number_format($ersInfo[11], 0, $locds, $locts),
				'%ESUM%' => number_format($iesum / 100, 2, $locds, $locts),
				'%FSUM%' => number_format($itsum / 100, 2, $locds, $locts),
				'%TSUM%' => number_format(($itsum - $iesum) / 100, 2, $locds, $locts)
			);
			$htmlStr[] = strtr($htmlArr[$ersInfo[11] > 0 ? 4 : 5], $istArr);
			$codeStr[] = $ersInfo[1] . '$' . $ersInfo[5] . '$' . $ersInfo[6] . '$' . $ersInfo[7] . '$' . $ersInfo[8] . '$' . $ersInfo[9] . '$' . $ersInfo[10] . '$' . $ersInfo[11];
		}
		$estArr = array(
			'%NUM%' => number_format($num, 0, $locds, $locts),
			'%ESUM%' => number_format($esum / 100, 2, $locds, $locts),
			'%FSUM%' => number_format($tsum / 100, 2, $locds, $locts),
			'%TSUM%' => number_format(($tsum - $esum) / 100, 2, $locds, $locts)
		);
		$htmlStr[] = strtr($htmlArr[6], $estArr);

		preparePDF($invoice);
		try
		{
			writePDF($invoice, $htmlArr[0]);
			$style = array(
				'position' => '',
				'align' => 'C',
				'stretch' => false,
				'fitwidth' => true,
				'cellfitalign' => 'R',
				'border' => false,
				'hpadding' => '2',
				'vpadding' => '0',
				'fgcolor' => array(0,0,0),
				'bgcolor' => false,
				'text' => true,
				'font' => 'dff',
				'fontsize' => 6,
				'stretchtext' => 4
			);
			writeBarcode($invoice, sprintf('%08d', $rsInfo[0]), $style, 10, 0.4);
			writePDF($invoice, $htmlArr[1]);
			writePDF($invoice, implode('', $htmlStr));
			writePDF($invoice, $htmlArr[2]);
			if($setting[4] != '')
			{
				$style = array(
					'position' => 'R',
					'border' => 0,
					'vpadding' => 5,
					'hpadding' => 5,
					'fgcolor' => array(0,0,0),
					'bgcolor' => false,
					'module_width' => 1,
					'module_height' => 1
				);
				writeQrcode($invoice, base64_encode($rsa->sign(base64_encode(implode('|', $codeStr)))), $style, 30);
			}
		}
		catch(Exception $e)
		{
			break;
		}
	}
	freeResult($rs);

	//Unlock tables
	query('Unlock tables', false);

	//Return the invoice
	return $invoice;
}
?>