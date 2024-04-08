<?php
/**
 * Created by Q-Solutions Studio
 *
 * @category    Nanobots
 * @package     Nanobots_SessionTimeoutPopup
 * @author      Jakub Winkler <jwinkler@qsolutionsstudio.com>
 */

declare(strict_types=1);

namespace Nanobots\SessionTimeoutPopup\Block;

use Magento\Framework\Session\Config as SessionConfig;
use Magento\Framework\View\Element\Template;
use Magento\Store\Model\ScopeInterface;

class Component extends Template
{
    const XPATH_NANOBOTS_SESSION_POPUP_TITLE = 'nanobots/sessionLifetimePopup/title';

    const XPATH_NANOBOTS_SESSION_LOGOUT_MESSAGE = 'nanobots/sessionLifetimePopup/logged_out_msg';

    const XPATH_NANOBOTS_SESSION_BUTTON_TITLE = 'nanobots/sessionLifetimePopup/button_title';

    const XPATH_NANOBOTS_SESSION_TIMEOUT_WARNING = 'nanobots/sessionLifetimePopup/seconds_warning';

    /**
     * @return int
     */
    public function getSessionLifetime(): int
    {
        return (int) $this->_scopeConfig->getValue(
            SessionConfig::XML_PATH_COOKIE_LIFETIME,
            ScopeInterface::SCOPE_STORE
        );
    }

    /**
     * @return int
     */
    public function getSessionTimeoutWarning(): int
    {
        return (int) $this->_scopeConfig->getValue(
            self::XPATH_NANOBOTS_SESSION_TIMEOUT_WARNING,
            ScopeInterface::SCOPE_STORE
        );
    }

    /**
     * @return string
     */
    public function getPopupTitle(): string
    {
        return (string) $this->_scopeConfig->getValue(
            self::XPATH_NANOBOTS_SESSION_POPUP_TITLE,
            ScopeInterface::SCOPE_STORE
        );
    }

    /**
     * @return string
     */
    public function getLoggedOutMessage(): string
    {
        return (string) $this->_scopeConfig->getValue(
            self::XPATH_NANOBOTS_SESSION_LOGOUT_MESSAGE,
            ScopeInterface::SCOPE_STORE
        );
    }

    /**
     * @return string
     */
    public function getLoginButtonTitle(): string
    {
        return (string) $this->_scopeConfig->getValue(
            self::XPATH_NANOBOTS_SESSION_BUTTON_TITLE,
            ScopeInterface::SCOPE_STORE
        );
    }
}
