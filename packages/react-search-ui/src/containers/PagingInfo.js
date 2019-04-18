import PropTypes from "prop-types";
import { Component } from "react";
import { withSearch } from "..";
import { PagingInfo } from "@elastic/react-search-ui-views";

export class PagingInfoContainer extends Component {
  static propTypes = {
    // Props
    className: PropTypes.string,
    view: PropTypes.func,
    // State
    current: PropTypes.number.isRequired,
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
    resultsPerPage: PropTypes.number.isRequired,
    resultSearchTerm: PropTypes.string.isRequired,
    totalResults: PropTypes.number.isRequired
  };

  render() {
    const {
      className,
      current,
      results,
      resultsPerPage,
      resultSearchTerm,
      totalResults,
      view
    } = this.props;
    const start = totalResults === 0 ? 0 : (current - 1) * resultsPerPage + 1;
    const end =
      totalResults <= resultsPerPage
        ? totalResults
        : start + resultsPerPage - 1;

    if (!resultSearchTerm && results.length === 0) return null;

    const View = view || PagingInfo;

    return View({
      className,
      end: end,
      searchTerm: resultSearchTerm,
      start: start,
      totalResults: totalResults
    });
  }
}

export default withSearch(PagingInfoContainer);
