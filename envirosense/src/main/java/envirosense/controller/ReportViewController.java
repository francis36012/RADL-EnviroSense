package envirosense.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ReportViewController {

	/**
	 * Returns the reports view
	 * @return Reports view
	 */
	@RequestMapping(value = "/report", method = RequestMethod.GET)
	public ModelAndView reportPage() {
		ModelAndView mv = new ModelAndView("report");
		return mv;
	}
}