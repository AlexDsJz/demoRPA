import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { ScriptTag } from "seed/helpers";
import Sidenav from "components/navigation/Sidenav";
import Orders from "components/orders/Orders";
import Shippings from "components/shippings/Shippings";
import Users from "components/users/Users";
import Cranes from "components/cranes/Cranes";
import Binnacles from "components/binnacle/Binnacle";
import Arris from "components/arris/Arris";
import Maintenances from "components/maintenances/Maintenances";
import SecurityRevisions from "components/security_revisions/SecurityRevisions";
import MaintenanceCategories from "components/maintenance_evidences/MaintenanceCategories"
import MaintenanceResponsibles from "components/maintenances/MaintenanceResponsibles"
import FailuresReport from "components/arris/arris_reports/FailuresReport";
import WeeklyReport from "components/arris/arris_reports/weekly_report/WeeklyReport";
import Information from "components/information/Information";
import Manuals from "components/information/Manuals";

const Home = ({ rol }) =>
  <>
    <div>
      <Sidenav />
      <main id="content" role="main" class="main">
        <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/shippings" component={Shippings} />
          <Route path="/cranes" component={Cranes} />
          <Route path="/users" component={Users} />
          <Route path="/binnacles" component={Binnacles} />
          <Route path="/ariss/failures_report" component={FailuresReport} />
          <Route path="/ariss/weekly_report" component={() => <WeeklyReport />} />
          <Route path="/ariss/daily_report" component={() => <WeeklyReport />} />
          <Route path="/ariss/failure_report" component={() => <WeeklyReport />} />
          <Route path="/ariss/not_sent_report" component={() => <WeeklyReport />} />
          <Route path="/ariss" component={Arris} />
          <Route path="/security_revisions" component={SecurityRevisions} />
          <Route path="/maintenances/categories/:maintenanceId(\d+)" component={MaintenanceCategories} />
          <Route path="/maintenances/responsibles/:maintenanceId(\d+)" component={MaintenanceResponsibles} />
          <Route path="/maintenances" component={Maintenances} />
          <Route path="/help" component={Information} />
          <Route path="/manuals" component={Manuals} />
          <Redirect to={rol == "ADMIN" || rol == "COMMERCIAL" ? "/orders" : 
            rol == "MAINTENANCE_SUPERVISOR" ? "/maintenances" : "/ariss"} />
        </Switch>
      </main>
    </div>

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

  </>;

Home.propTypes = {
  rol: PropTypes.string
};

export default Home;
