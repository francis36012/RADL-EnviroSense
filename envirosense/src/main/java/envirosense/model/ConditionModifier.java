package envirosense.model;


/**
 * A ConditionModifier represents a logical operator used when evaluating conditions
 */
public enum ConditionModifier {
	/** Greater */
	GT("Greater"),
	
	/** Greater or equal */
	GE("GreaterOrEqual"),
	
	/** Less or equal */
	LE("LessOrEqual"),
	
	/** Less */
	LT("Less"),
	
	/** Equal */
	EQ("Equal"),
	
	/** Not equal */
	NE("NotEqual");
	
	String modifier;

	private ConditionModifier(String modifier) {
		this.modifier = modifier;
	}
	
	/**
	 * Returns the string representation of modifier
	 * @return String representation of modifier
	 */
	public String getConditionModifier() {
		return modifier;
	}
}