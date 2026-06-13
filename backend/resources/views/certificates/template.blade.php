<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <style>
        @page { margin: 0; }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: "Helvetica", "DejaVu Sans", sans-serif;
            color: #1f2937;
        }

        /* Full landscape canvas (A4 landscape ≈ 1122 x 793 px @96dpi) */
        .page {
            position: relative;
            width: 100%;
            height: 793px;
            background-color: #ffffff;
        }

        /* Themed outer frame */
        .frame-outer {
            position: absolute;
            top: 18px; left: 18px; right: 18px; bottom: 18px;
            border: 10px solid {{ $theme['primary'] }};
        }

        /* Thin inner frame for the double-border look */
        .frame-inner {
            position: absolute;
            top: 30px; left: 30px; right: 30px; bottom: 30px;
            border: 2px solid {{ $theme['secondary'] }};
        }

        /* Moroccan-inspired diamond ornaments in each corner */
        .corner {
            position: absolute;
            width: 26px;
            height: 26px;
            background-color: {{ $theme['secondary'] }};
            border: 3px solid {{ $theme['accent'] }};
        }
        .corner.tl { top: 22px; left: 22px; }
        .corner.tr { top: 22px; right: 22px; }
        .corner.bl { bottom: 22px; left: 22px; }
        .corner.br { bottom: 22px; right: 22px; }

        .corner-dot {
            position: absolute;
            width: 10px; height: 10px;
            background-color: {{ $theme['primary'] }};
        }
        .corner-dot.tl { top: 30px; left: 30px; }
        .corner-dot.tr { top: 30px; right: 30px; }
        .corner-dot.bl { bottom: 30px; left: 30px; }
        .corner-dot.br { bottom: 30px; right: 30px; }

        /* Centered content column */
        .content {
            position: absolute;
            top: 56px; left: 70px; right: 70px; bottom: 56px;
            text-align: center;
        }

        .logo { width: 84px; height: 84px; }

        .brand {
            font-size: 13px;
            font-weight: bold;
            letter-spacing: 6px;
            color: {{ $theme['accent'] }};
            margin-top: 6px;
            text-transform: uppercase;
        }

        .title {
            font-family: "Times", "DejaVu Serif", serif;
            font-size: 46px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #111827;
            margin-top: 14px;
            text-transform: uppercase;
        }

        .rule {
            width: 220px;
            height: 3px;
            background-color: {{ $theme['primary'] }};
            margin: 14px auto 0 auto;
        }

        .presented {
            font-size: 13px;
            color: #6b7280;
            letter-spacing: 2px;
            margin-top: 22px;
            text-transform: uppercase;
        }

        .name {
            font-family: "Times", "DejaVu Serif", serif;
            font-size: 40px;
            font-weight: bold;
            font-style: italic;
            color: {{ $theme['accent'] }};
            margin-top: 8px;
        }

        .name-rule {
            width: 380px;
            height: 1px;
            background-color: #d1d5db;
            margin: 10px auto 0 auto;
        }

        .desc {
            font-size: 14px;
            color: #374151;
            margin-top: 20px;
            line-height: 1.6;
        }

        .cert-title {
            font-size: 22px;
            font-weight: bold;
            color: {{ $theme['primary'] }};
            margin-top: 6px;
        }

        .track-pill {
            display: inline-block;
            margin-top: 12px;
            padding: 6px 22px;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 2px;
            color: {{ $theme['accent'] }};
            background-color: {{ $theme['soft'] }};
            border: 1px solid {{ $theme['secondary'] }};
            border-radius: 20px;
            text-transform: uppercase;
        }

        /* Footer: signature + date, laid out with a table for dompdf reliability */
        .footer {
            position: absolute;
            left: 70px; right: 70px; bottom: 40px;
        }
        .footer table { width: 100%; }
        .footer td { width: 33%; vertical-align: bottom; text-align: center; }

        .sign-line {
            border-top: 1.5px solid #374151;
            width: 180px;
            margin: 0 auto;
            padding-top: 6px;
            font-size: 12px;
            color: #374151;
            font-weight: bold;
        }
        .sign-sub { font-size: 10px; color: #9ca3af; letter-spacing: 1px; }

        .seal {
            width: 78px; height: 78px;
            border: 3px solid {{ $theme['primary'] }};
            border-radius: 50%;
            margin: 0 auto;
            text-align: center;
        }
        .seal-inner {
            margin: 9px;
            width: 54px; height: 54px;
            border: 1px solid {{ $theme['secondary'] }};
            border-radius: 50%;
        }
        .seal-text {
            font-size: 9px; font-weight: bold;
            color: {{ $theme['accent'] }};
            letter-spacing: 1px;
            padding-top: 14px;
        }
        .seal-text small { display: block; font-size: 7px; letter-spacing: 0; }

        .cert-number {
            position: absolute;
            bottom: 14px; left: 0; right: 0;
            text-align: center;
            font-size: 10px;
            letter-spacing: 2px;
            color: #9ca3af;
        }
        .cert-number strong { color: {{ $theme['accent'] }}; }
    </style>
</head>
<body>
    <div class="page">
        <div class="frame-outer"></div>
        <div class="frame-inner"></div>

        <div class="corner tl"></div>
        <div class="corner tr"></div>
        <div class="corner bl"></div>
        <div class="corner br"></div>
        <div class="corner-dot tl"></div>
        <div class="corner-dot tr"></div>
        <div class="corner-dot bl"></div>
        <div class="corner-dot br"></div>

        <div class="content">
            @if($logoData)
                <img src="{{ $logoData }}" class="logo" alt="AMUDUX">
            @endif
            <div class="brand">A M U D U X &nbsp;&middot;&nbsp; Learning</div>

            <div class="title">Certificate of Completion</div>
            <div class="rule"></div>

            <div class="presented">This certificate is proudly presented to</div>
            <div class="name">{{ $fullName }}</div>
            <div class="name-rule"></div>

            <div class="desc">for successfully completing all missions of the</div>
            <div class="cert-title">{{ $title }}</div>
            <div class="track-pill">{{ $trackLabel }} Track</div>

            <div class="footer">
                <table>
                    <tr>
                        <td>
                            <div class="sign-line">
                                {{ $issuedAt->format('F j, Y') }}
                                <div class="sign-sub">DATE OF COMPLETION</div>
                            </div>
                        </td>
                        <td>
                            <div class="seal">
                                <div class="seal-inner">
                                    <div class="seal-text">AMUDUX<small>OFFICIAL</small></div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="sign-line">
                                AMUDUX Learning
                                <div class="sign-sub">AUTHORIZED SIGNATURE</div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="cert-number">
            CERTIFICATE No.&nbsp; <strong>{{ $number }}</strong>
        </div>
    </div>
</body>
</html>
