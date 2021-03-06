export interface AutoformatBaseRule {
  /**
   * Triggering character to autoformat. Default is space.
   */
  trigger?: string | string[]

  /**
   * If true, insert the triggering character after autoformatting.
   */
  insertTrigger?: boolean
}
