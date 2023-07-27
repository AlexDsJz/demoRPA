/*
__Seed builder__
  (Read_only) Example view
  Be careful copying content
*/

import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { Route } from "seed/helpers"
import { ScriptTag } from "seed/helpers";
import ActionLogs from "seed/examples/components/action_logs/ActionLogs";
import AppInfos from "seed/examples/components/app_infos/AppInfos";
import ArrisCraneStatuses from "seed/examples/components/arris_crane_statuses/ArrisCraneStatuses";
import ArrisFailures from "seed/examples/components/arris_failures/ArrisFailures";
import ArrisFiles from "seed/examples/components/arris_files/ArrisFiles";
import ArrisForms from "seed/examples/components/arris_forms/ArrisForms";
import ArrisOperators from "seed/examples/components/arris_operators/ArrisOperators";
import Contents from "seed/examples/components/contents/Contents";
import Cranes from "seed/examples/components/cranes/Cranes";
import Evidences from "seed/examples/components/evidences/Evidences";
import Items from "seed/examples/components/items/Items";
import Maintenances from "seed/examples/components/maintenances/Maintenances";
import MaintenanceCategories from "seed/examples/components/maintenance_categories/MaintenanceCategories";
import MaintenanceEvidences from "seed/examples/components/maintenance_evidences/MaintenanceEvidences";
import MaintenanceFiles from "seed/examples/components/maintenance_files/MaintenanceFiles";
import MaintenancePermses from "seed/examples/components/maintenance_permses/MaintenancePermses";
import MaintenanceTypes from "seed/examples/components/maintenance_types/MaintenanceTypes";
import OnedriveAuths from "seed/examples/components/onedrive_auths/OnedriveAuths";
import Operations from "seed/examples/components/operations/Operations";
import Orders from "seed/examples/components/orders/Orders";
import Parts from "seed/examples/components/parts/Parts";
import SecurityCategories from "seed/examples/components/security_categories/SecurityCategories";
import SecurityChecks from "seed/examples/components/security_checks/SecurityChecks";
import SecurityCheckTypes from "seed/examples/components/security_check_types/SecurityCheckTypes";
import SecurityRevisions from "seed/examples/components/security_revisions/SecurityRevisions";
import Shippings from "seed/examples/components/shippings/Shippings";
import Suggestions from "seed/examples/components/suggestions/Suggestions";
import Users from "seed/examples/components/users/Users";
import Sidenav from "seed/examples/components/nav/Sidenav";
import Topnav from "seed/examples/components/nav/Topnav";

const HomeView = () =>
  <div>
    <Topnav />
    <Sidenav />

    <main id="content" role="main" class="main">
    <Switch>
      <Route path="/action_logs" component={ActionLogs } />
      <Route path="/app_infos" component={AppInfos } />
      <Route path="/arris_crane_statuses" component={ArrisCraneStatuses } />
      <Route path="/arris_failures" component={ArrisFailures } />
      <Route path="/arris_files" component={ArrisFiles } />
      <Route path="/arris_forms" component={ArrisForms } />
      <Route path="/arris_operators" component={ArrisOperators } />
      <Route path="/contents" component={Contents } />
      <Route path="/cranes" component={Cranes } />
      <Route path="/evidences" component={Evidences } />
      <Route path="/items" component={Items } />
      <Route path="/maintenances" component={Maintenances } />
      <Route path="/maintenance_categories" component={MaintenanceCategories } />
      <Route path="/maintenance_evidences" component={MaintenanceEvidences } />
      <Route path="/maintenance_files" component={MaintenanceFiles } />
      <Route path="/maintenance_permses" component={MaintenancePermses } />
      <Route path="/maintenance_types" component={MaintenanceTypes } />
      <Route path="/onedrive_auths" component={OnedriveAuths } />
      <Route path="/operations" component={Operations } />
      <Route path="/orders" component={Orders } />
      <Route path="/parts" component={Parts } />
      <Route path="/security_categories" component={SecurityCategories } />
      <Route path="/security_checks" component={SecurityChecks } />
      <Route path="/security_check_types" component={SecurityCheckTypes } />
      <Route path="/security_revisions" component={SecurityRevisions } />
      <Route path="/shippings" component={Shippings } />
      <Route path="/suggestions" component={Suggestions } />
      <Route path="/users" component={Users } />
    </Switch>
      <div class="footer">
        <div class="row justify-content-between align-items-center">
          <div class="col">
            <p class="font-size-sm mb-0">
                &copy; SeedProject. <span class="d-none d-sm-inline-block">2021.</span>
             </p>
          </div>
        </div>
      </div>

    </main>

    <ScriptTag content={`
         // Builder toggle invoker
        $('.js-navbar-vertical-aside-toggle-invoker').click(function () {
          $('.js-navbar-vertical-aside-toggle-invoker i').tooltip('hide');
        });

        // Initialization of navbar vertical navigation
        var sidebar = $('.js-navbar-vertical-aside').hsSideNav();

        // Initialization of tooltip in navbar vertical menu
        $('.js-nav-tooltip-link').tooltip({ boundary: 'window' })

        $(".js-nav-tooltip-link").on("show.bs.tooltip", function(e) {
          if (!$("body").hasClass("navbar-vertical-aside-mini-mode")) {
            return false;
          }
        });

        // Initialization of unfold
        $('.js-hs-unfold-invoker').each(function () {
          var unfold = new HSUnfold($(this)).init();
        });

        // Initialization of form search
        $('.js-form-search').each(function () {
          new HSFormSearch($(this)).init()
        });
    `} />
  </div>;

HomeView.propTypes = {};

export default HomeView;