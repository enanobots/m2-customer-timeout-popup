<?php
/**
 * Created by Q-Solutions Studio
 *
 * @category    Nanobots
 * @package     Nanobots_SessionTimeoutPopup
 * @author      Jakub Winkler <jwinkler@qsolutionsstudio.com>
 */
declare(strict_types=1);

namespace Nanobots\SessionTimeoutPopup\Api;

interface UpdateSessionInterface
{
    /**
     * @return void
     */
    public function bulkRequest(): void;
}
