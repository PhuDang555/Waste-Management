<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class StatusType extends Enum
{
    const AWAITING = 0;
    const PROCESSING = 1;
    const PROCESSED = 2;
}
