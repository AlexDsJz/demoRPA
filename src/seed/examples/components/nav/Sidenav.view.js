/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { Link, NavLink } from "react-router-dom";

const SidenavView = () =>
  <aside class={`js-navbar-vertical-aside navbar navbar-vertical-aside
    navbar-vertical navbar-vertical-fixed navbar-expand-xl navbar-bordered navbar-dark`}>
    <div class="navbar-vertical-container">
      <div class="navbar-vertical-footer-offset">
        <div class="navbar-brand-wrapper justify-content-between">
          {/* Logo */}
          <a class="navbar-brand" href="./index.html" aria-label="Front">
            <img class="navbar-brand-logo" src="/theme/svg/logos/logo-white.svg" alt="Logo" />
            <img class="navbar-brand-logo-mini" src="/theme/svg/logos/logo-short.svg" alt="Logo" />
          </a>

          {/* Vertical Toggle */}
          <button type="button" class={`js-navbar-vertical-aside-toggle-invoker
            navbar-vertical-aside-toggle btn btn-icon btn-xs btn-ghost-dark`}>
            <i class="tio-clear tio-lg"></i>
          </button>
        </div>

        {/* Content */}
        <div class="navbar-vertical-content">
          <ul class="navbar-nav navbar-nav-lg nav-tabs">
          
            {/* Menu */}
            
            {/* Action logs */}
            <li class="navbar-item">
              <NavLink
                to="/action_logs"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Action logs
                </span>
              </NavLink>
            </li>
            
            {/* App infos */}
            <li class="navbar-item">
              <NavLink
                to="/app_infos"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  App infos
                </span>
              </NavLink>
            </li>
            
            {/* Arris crane statuses */}
            <li class="navbar-item">
              <NavLink
                to="/arris_crane_statuses"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Arris crane statuses
                </span>
              </NavLink>
            </li>
            
            {/* Arris failures */}
            <li class="navbar-item">
              <NavLink
                to="/arris_failures"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Arris failures
                </span>
              </NavLink>
            </li>
            
            {/* Arris files */}
            <li class="navbar-item">
              <NavLink
                to="/arris_files"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Arris files
                </span>
              </NavLink>
            </li>
            
            {/* Arris forms */}
            <li class="navbar-item">
              <NavLink
                to="/arris_forms"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Arris forms
                </span>
              </NavLink>
            </li>
            
            {/* Arris operators */}
            <li class="navbar-item">
              <NavLink
                to="/arris_operators"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Arris operators
                </span>
              </NavLink>
            </li>
            
            {/* Contents */}
            <li class="navbar-item">
              <NavLink
                to="/contents"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Contents
                </span>
              </NavLink>
            </li>
            
            {/* Cranes */}
            <li class="navbar-item">
              <NavLink
                to="/cranes"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Cranes
                </span>
              </NavLink>
            </li>
            
            {/* Evidences */}
            <li class="navbar-item">
              <NavLink
                to="/evidences"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Evidences
                </span>
              </NavLink>
            </li>
            
            {/* Items */}
            <li class="navbar-item">
              <NavLink
                to="/items"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Items
                </span>
              </NavLink>
            </li>
            
            {/* Maintenances */}
            <li class="navbar-item">
              <NavLink
                to="/maintenances"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Maintenances
                </span>
              </NavLink>
            </li>
            
            {/* Maintenance categories */}
            <li class="navbar-item">
              <NavLink
                to="/maintenance_categories"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Maintenance categories
                </span>
              </NavLink>
            </li>
            
            {/* Maintenance evidences */}
            <li class="navbar-item">
              <NavLink
                to="/maintenance_evidences"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Maintenance evidences
                </span>
              </NavLink>
            </li>
            
            {/* Maintenance files */}
            <li class="navbar-item">
              <NavLink
                to="/maintenance_files"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Maintenance files
                </span>
              </NavLink>
            </li>
            
            {/* Maintenance permses */}
            <li class="navbar-item">
              <NavLink
                to="/maintenance_permses"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Maintenance permses
                </span>
              </NavLink>
            </li>
            
            {/* Maintenance types */}
            <li class="navbar-item">
              <NavLink
                to="/maintenance_types"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Maintenance types
                </span>
              </NavLink>
            </li>
            
            {/* Onedrive auths */}
            <li class="navbar-item">
              <NavLink
                to="/onedrive_auths"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Onedrive auths
                </span>
              </NavLink>
            </li>
            
            {/* Operations */}
            <li class="navbar-item">
              <NavLink
                to="/operations"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Operations
                </span>
              </NavLink>
            </li>
            
            {/* Orders */}
            <li class="navbar-item">
              <NavLink
                to="/orders"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Orders
                </span>
              </NavLink>
            </li>
            
            {/* Parts */}
            <li class="navbar-item">
              <NavLink
                to="/parts"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Parts
                </span>
              </NavLink>
            </li>
            
            {/* Security categories */}
            <li class="navbar-item">
              <NavLink
                to="/security_categories"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Security categories
                </span>
              </NavLink>
            </li>
            
            {/* Security checks */}
            <li class="navbar-item">
              <NavLink
                to="/security_checks"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Security checks
                </span>
              </NavLink>
            </li>
            
            {/* Security check types */}
            <li class="navbar-item">
              <NavLink
                to="/security_check_types"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Security check types
                </span>
              </NavLink>
            </li>
            
            {/* Security revisions */}
            <li class="navbar-item">
              <NavLink
                to="/security_revisions"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Security revisions
                </span>
              </NavLink>
            </li>
            
            {/* Shippings */}
            <li class="navbar-item">
              <NavLink
                to="/shippings"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Shippings
                </span>
              </NavLink>
            </li>
            
            {/* Suggestions */}
            <li class="navbar-item">
              <NavLink
                to="/suggestions"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Suggestions
                </span>
              </NavLink>
            </li>
            
            {/* Users */}
            <li class="navbar-item">
              <NavLink
                to="/users"
                className="js-nav-tooltip-link nav-link"
                activeClassName="active">
                <i class="tio-hashtag nav-icon"></i>
                <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                  Users
                </span>
              </NavLink>
            </li>
            
            <div class="dropdown-divider my-3" style={ {borderTopColor: "#ffffff20"} }></div>
            
            {/* Options */}
            <Link
              to="/logout"
              className="js-nav-tooltip-link nav-link">
              <i class="tio-sign-out nav-icon"></i>
              <span class="navbar-vertical-aside-mini-mode-hidden-elements text-truncate">
                Logout
              </span>
            </Link>
          </ul>
        </div>
      </div>
    </div>

  </aside>;

SidenavView.propTypes = {};

export default SidenavView;